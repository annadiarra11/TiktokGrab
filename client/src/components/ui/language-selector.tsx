import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { type Language, languages } from "@/lib/translations";

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-cream-dark hover:text-accent-orange hover:bg-coffee-light/50 transition-all duration-300"
          data-testid="button-language-selector"
        >
          <Globe className="h-4 w-4 mr-2" />
          {languages[currentLanguage]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="card-gradient border-0 backdrop-blur-lg"
        data-testid="dropdown-language-menu"
      >
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => onLanguageChange(code as Language)}
            className={`text-cream-dark hover:text-accent-orange hover:bg-coffee-light/50 transition-all duration-300 cursor-pointer ${
              currentLanguage === code ? 'bg-coffee-light/30 text-accent-orange' : ''
            }`}
            data-testid={`language-option-${code}`}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}