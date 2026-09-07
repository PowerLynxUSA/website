import { useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { languages } from '@/data/languages';
import { useLanguage } from '@/i18n';

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
}

export function LanguageSwitcher({ variant = 'desktop' }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const { language, languageInfo, setLanguage, t } = useLanguage();

  if (variant === 'mobile') {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="flex items-center gap-3 w-full"
            data-testid="button-language-switcher-mobile"
          >
            <span className="text-lg leading-none">{languageInfo.flag}</span>
            <span className="font-bold tracking-widest uppercase text-sm">{languageInfo.code}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[300px] p-0 rounded-none">
          <LanguageList
            selectedCode={language}
            onSelect={(lang) => {
              setLanguage(lang.code);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 font-bold rounded-none border-border"
          data-testid="button-language-switcher"
        >
          <span className="text-base leading-none">{languageInfo.flag}</span>
          {languageInfo.code}
          <ChevronDown className="w-3 h-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[320px] p-0 rounded-none">
        <LanguageList
          selectedCode={language}
          onSelect={(lang) => {
            setLanguage(lang.code);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function LanguageList({
  selectedCode,
  onSelect,
}: {
  selectedCode: (typeof languages)[number]['code'];
  onSelect: (lang: (typeof languages)[number]) => void;
}) {
  const { t } = useLanguage();
  return (
    <Command className="rounded-none">
      <CommandInput placeholder={t('language.search')} data-testid="input-language-search" />
      <CommandList className="max-h-[320px]">
        <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
          {t('language.empty')}
        </CommandEmpty>
        <CommandGroup>
          {languages.map((lang) => (
            <CommandItem
              key={lang.code}
              value={`${lang.name} ${lang.nativeName} ${lang.code}`}
              onSelect={() => onSelect(lang)}
              className={`group rounded-none py-2.5 px-3 cursor-pointer data-[selected=true]:!text-white ${
                selectedCode === lang.code ? 'bg-primary/10' : ''
              }`}
              data-testid={`option-language-${lang.code}`}
            >
              <span className="text-lg leading-none mr-1">{lang.flag}</span>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold leading-tight truncate group-data-[selected=true]:!text-white">
                  {lang.name}
                </span>
                <span className="text-xs text-muted-foreground leading-tight truncate group-data-[selected=true]:!text-white/80">
                  {lang.nativeName} · {lang.code}
                </span>
              </div>
              {selectedCode === lang.code && (
                <Check className="w-4 h-4 text-primary ml-auto shrink-0 group-data-[selected=true]:!text-white" />
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
