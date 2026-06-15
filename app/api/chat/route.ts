import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';
import { buildSystemPrompt } from '../../data/portfolioKnowledge';

type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};

const FALLBACK_MODELS = [
    'gemini-2.5-flash',
    'gemini-flash-latest',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
];

function buildGeminiHistory(messages: ChatMessage[]) {
    const prior = messages.slice(0, -1);
    const history: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

    for (const msg of prior) {
        const role = msg.role === 'assistant' ? ('model' as const) : ('user' as const);
        if (history.length === 0 && role === 'model') continue;
        history.push({ role, parts: [{ text: msg.content }] });
    }

    return history;
}

function isQuotaError(message: string) {
    return message.includes('429') || message.includes('quota') || message.includes('Too Many Requests');
}

function isAuthError(message: string) {
    return (
        message.includes('API_KEY_INVALID') ||
        message.includes('401') ||
        message.includes('UNAUTHENTICATED')
    );
}

function isRetryableModelError(message: string) {
    if (isQuotaError(message)) return true;
    return (
        message.includes('503') ||
        message.includes('fetch failed') ||
        message.includes('high demand') ||
        message.includes('UNAVAILABLE') ||
        message.includes('overloaded') ||
        message.includes('ECONNRESET') ||
        message.includes('ETIMEDOUT')
    );
}

async function generateReply(
    model: GenerativeModel,
    history: ReturnType<typeof buildGeminiHistory>,
    userMessage: string
) {
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(userMessage);
    return result.response.text();
}

export async function POST(request: Request) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return Response.json(
            { error: 'Chat is not configured. Add GEMINI_API_KEY to your environment.' },
            { status: 503 }
        );
    }

    let body: { messages?: ChatMessage[] };
    try {
        body = await request.json();
    } catch {
        return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const messages = body.messages;
    if (!messages?.length) {
        return Response.json({ error: 'Messages are required' }, { status: 400 });
    }

    const last = messages[messages.length - 1];
    if (last.role !== 'user' || !last.content.trim()) {
        return Response.json({ error: 'Last message must be from the user' }, { status: 400 });
    }

    if (messages.length > 20) {
        return Response.json({ error: 'Conversation too long. Please start a new chat.' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const systemInstruction = buildSystemPrompt();
    const history = buildGeminiHistory(messages);
    const userMessage = last.content.trim();

    const preferred = process.env.GEMINI_MODEL;
    const modelsToTry = [
        ...(preferred ? [preferred] : []),
        ...FALLBACK_MODELS.filter((m) => m !== preferred),
    ];

    let lastError = '';

    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName, systemInstruction });
            const reply = await generateReply(model, history, userMessage);
            return Response.json({ reply });
        } catch (error) {
            lastError = error instanceof Error ? error.message : 'Unknown error';
            if (process.env.NODE_ENV === 'development') {
                console.warn(`Gemini model ${modelName} failed:`, lastError.slice(0, 200));
            }
            if (isAuthError(lastError) || !isRetryableModelError(lastError)) break;
        }
    }

    if (process.env.NODE_ENV === 'development') {
        console.error('Gemini API error:', lastError.slice(0, 300));
    }

    if (isQuotaError(lastError)) {
        return Response.json(
            {
                error:
                    'AI quota limit reached on all available models. Wait a minute and retry, or enable billing in Google AI Studio.',
            },
            { status: 429 }
        );
    }
    if (
        lastError.includes('503') ||
        lastError.includes('high demand') ||
        lastError.includes('UNAVAILABLE') ||
        lastError.includes('fetch failed')
    ) {
        return Response.json(
            {
                error:
                    'The AI service is temporarily unavailable. Please wait a moment and try again.',
            },
            { status: 503 }
        );
    }
    if (lastError.includes('API_KEY_INVALID')) {
        return Response.json(
            { error: 'Invalid API key. Check GEMINI_API_KEY in .env.local' },
            { status: 401 }
        );
    }

    return Response.json(
        { error: 'Failed to get a response. Please try again.' },
        { status: 500 }
    );
}
