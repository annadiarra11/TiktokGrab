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
    <Card className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
      <CardContent className="p-0">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800 transition-colors duration-300 bg-black border-0 rounded-none text-white hover:text-white"
          data-testid={`button-faq-${question.toLowerCase().replace(/\s+/g, '-').replace(/[?]/g, '')}`}
        >
          <span className="font-semibold text-white">{question}</span>
          <ChevronDown 
            className={cn(
              "transition-transform duration-300 text-gray-300",
              isOpen && "rotate-180"
            )} 
          />
        </Button>
        {isOpen && (
          <div className="px-6 pb-4 text-gray-700 bg-white" data-testid={`text-faq-answer-${question.toLowerCase().replace(/\s+/g, '-').replace(/[?]/g, '')}`}>
            <p>{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
