import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
}

interface Question {
  id: string;
  question: string;
  answer: string;
}

const predefinedQuestions: Question[] = [
  {
    id: '1',
    question: "I didn't get sent my discount code...",
    answer: 'If you haven\'t received your discount code, please check your spam folder. If you still can\'t find it, we\'ll be happy to resend it to you.',
  },
  {
    id: '2',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy on all items. Items must be unworn and in their original packaging. Contact us for a return shipping label.',
  },
  {
    id: '3',
    question: 'Will you be doing gold jewellery?',
    answer: 'Yes! We\'re excited to announce that we\'ll be launching our gold jewelry collection soon. Sign up for our newsletter to be the first to know when it launches.',
  },
];

export function Chatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showQuestions, setShowQuestions] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const handleQuestionClick = (question: Question) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), type: 'user', content: question.question },
      { id: (Date.now() + 1).toString(), type: 'bot', content: question.answer },
    ]);
    setShowQuestions(false);
  };

  const handleCustomMessage = () => {
    if (inputValue.trim()) {
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), type: 'user', content: inputValue },
        { 
          id: (Date.now() + 1).toString(), 
          type: 'bot', 
          content: "Thank you for your message! For personalized assistance, please visit our contact page where our team can better help you.",
        }
      ]);
      setInputValue('');
      setShowQuestions(false);

      // Add contact button after a short delay
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 2).toString(),
            type: 'bot',
            content: '<button class="contact-us-btn">Contact Us</button>'
          }
        ]);
      }, 1000);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setShowQuestions(true);
  };

  return (
    <>
      <Button
        variant="high"
        size="md"
        className="fixed bottom-4 right-4 rounded-full shadow-lg z-50 h-14 w-14 p-0"
        onClick={() => setIsOpen(true)}
      >
        <Icon name="chatBubbleOvalLeft" size="lg" className="text-white" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          'fixed bottom-4 right-4 w-[400px] bg-background rounded-lg border shadow-lg transition-all duration-300 z-50',
          'transform',
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-semibold">Chat with us</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">
            Hey, you ❤️ We're excited to have you here! Please get in touch if I can help you with anything...
          </p>
        </div>

        {/* Chat Content */}
        <div className="h-[400px] overflow-y-auto p-6">
          {messages.map(message => (
            <div
              key={message.id}
              className={cn(
                'mb-4 max-w-[80%] rounded-2xl p-4',
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground ml-auto'
                  : 'bg-secondary'
              )}
              onClick={(e) => {
                if ((e.target as HTMLElement).classList.contains('contact-us-btn')) {
                  setIsOpen(false);
                  navigate('/contact');
                }
              }}
              dangerouslySetInnerHTML={{ __html: message.content }}
            />
          ))}

          {showQuestions && (
            <div className="space-y-3">
              <h4 className="font-medium text-lg mb-4">Instant answers</h4>
              {predefinedQuestions.map(q => (
                <button
                  key={q.id}
                  className="w-full text-left p-4 rounded-2xl border hover:bg-secondary/50 transition-colors text-foreground/80"
                  onClick={() => handleQuestionClick(q)}
                >
                  {q.question}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="relative">
            <input
              type="text"
              placeholder="Write message"
              className="w-full px-4 py-3 rounded-full bg-secondary border-0 pr-12"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCustomMessage();
                }
              }}
            />
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors"
              onClick={handleCustomMessage}
            >
              <Icon name="paperAirplane" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}