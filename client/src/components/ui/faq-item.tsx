import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="card-gradient rounded-xl overflow-hidden border-0">
      <CardContent className="p-0">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-coffee-light transition-colors duration-300 bg-transparent border-0 rounded-none"
          data-testid={`button-faq-${question.toLowerCase().replace(/\s+/g, '-').replace(/[?]/g, '')}`}
        >
          <span className="font-semibold text-cream">{question}</span>
          <ChevronDown 
            className={cn(
              "transition-transform duration-300 text-cream-dark",
              isOpen && "rotate-180"
            )} 
          />
        </Button>
        {isOpen && (
          <div className="px-6 pb-4 text-cream-dark" data-testid={`text-faq-answer-${question.toLowerCase().replace(/\s+/g, '-').replace(/[?]/g, '')}`}>
            <p>{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
