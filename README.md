# Onboarding Chat Application

A modern, enterprise-grade Next.js chat application for onboarding assistance, built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- 🚀 **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- 🎨 **Beautiful UI**: shadcn/ui components with dark/light mode support
- 💬 **Real-time Chat**: Responsive chat interface with typing indicators
- 🔄 **State Management**: Zustand for efficient state management
- 🌐 **API Integration**: Built-in API service layer for Python backend
- 📱 **Responsive Design**: Mobile-first responsive design
- ⚡ **Enterprise Patterns**: Clean architecture with proper separation of concerns
- 🔒 **Type Safety**: Full TypeScript support with strict typing
- 🎯 **Accessibility**: ARIA-compliant components
- 🔧 **Developer Experience**: ESLint, Prettier, and comprehensive tooling

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with CSS variables
│   └── page.tsx           # Main chat page
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── scroll-area.tsx
│   │   └── avatar.tsx
│   ├── chat/             # Chat-specific components
│   │   ├── chat-container.tsx
│   │   ├── message.tsx
│   │   ├── message-input.tsx
│   │   └── message-list.tsx
│   └── common/           # Shared components
├── hooks/                # Custom React hooks
│   └── useChat.ts       # Chat functionality hook
├── stores/               # State management
│   └── chatStore.ts     # Zustand chat store
├── services/             # External services
│   └── api.ts           # API service layer
├── types/                # TypeScript definitions
│   └── index.ts         # Shared type definitions
├── lib/                  # Utility libraries
│   └── utils.ts         # Utility functions
├── constants/            # Application constants
│   └── index.ts         # Configuration constants
└── utils/                # Additional utilities
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Python backend API (running on port 8000 by default)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd onboarding-chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Integration

The application expects a Python backend with the following endpoints:

### Required Endpoints

- `POST /api/chat` - Send a message and receive response
- `GET /api/messages/{sessionId}` - Get chat history
- `POST /api/session` - Create new chat session
- `GET /api/session/{sessionId}` - Get session details
- `GET /api/user/{userId}` - Get user information
- `PUT /api/user/{userId}` - Update user information

### API Request/Response Format

**Send Message:**
```json
POST /api/chat
{
  "message": "Hello, I need help with onboarding",
  "session_id": "session-123"
}

Response:
{
  "success": true,
  "data": {
    "id": "msg-456",
    "content": "Hello! I'm here to help you with your onboarding process.",
    "timestamp": "2024-01-01T12:00:00Z",
    "sender": "agent",
    "type": "text",
    "metadata": {}
  }
}
```

## Configuration

### Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: Backend API base URL (default: http://localhost:8000)
- `NODE_ENV`: Environment mode (development/production)

### Chat Configuration

Edit `src/constants/index.ts` to modify:

- `MAX_MESSAGE_LENGTH`: Maximum characters per message (default: 1000)
- `TYPING_DELAY_MS`: Typing indicator delay (default: 1500ms)
- `RETRY_ATTEMPTS`: API retry attempts (default: 3)

## Component Usage

### Basic Chat Implementation

```tsx
import { ChatContainer } from '@/components/chat/chat-container'

export default function MyPage() {
  return (
    <div className="h-screen">
      <ChatContainer 
        className="h-full" 
        userId="user-123" 
      />
    </div>
  )
}
```

### Using the Chat Hook

```tsx
import { useChat } from '@/hooks/useChat'

export default function CustomChatComponent() {
  const {
    messages,
    sendMessage,
    isLoading,
    error,
    isConnected
  } = useChat()

  const handleSend = async (content: string) => {
    try {
      await sendMessage(content)
    } catch (err) {
      console.error('Failed to send message:', err)
    }
  }

  return (
    <div>
      {/* Your custom chat UI */}
    </div>
  )
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

### Code Style

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking
- **Tailwind CSS** for styling

### Adding New Components

1. Create component in appropriate directory (`src/components/`)
2. Export from component file
3. Add TypeScript interfaces for props
4. Include proper accessibility attributes
5. Add to component index if needed

## Architecture Decisions

### State Management
- **Zustand** for global state management
- Local component state for UI-specific state
- Persistent storage for user sessions

### Styling
- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theme customization
- **shadcn/ui** for consistent component library

### API Layer
- **Axios** for HTTP requests
- Centralized error handling
- Request/response interceptors
- Type-safe API responses

### Type Safety
- Strict TypeScript configuration
- Interface-driven development
- Generic type utilities
- Runtime type validation where needed

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@yourcompany.com or create an issue in the GitHub repository.
