import { useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { languages } from '@/data/languages';

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
}

export function LanguageSwitcher({ variant = 'desktop' }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);

  if (variant === 'mobile') {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="flex items-center gap-3 w-full"
            data-testid="button-language-switcher-mobile"
          >
            <span className="text-lg leading-none">{selected.flag}</span>
            <span className="font-bold tracking-widest uppercase text-sm">{selected.code}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[300px] p-0 rounded-none">
          <LanguageList
            selected={selected}
            onSelect={(lang) => {
              setSelected(lang);
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
          <span className="text-base leading-none">{selected.flag}</span>
          {selected.code}
          <ChevronDown className="w-3 h-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[320px] p-0 rounded-none">
        <LanguageList
          selected={selected}
          onSelect={(lang) => {
            setSelected(lang);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function LanguageList({
  selected,
  onSelect,
}: {
  selected: (typeof languages)[number];
  onSelect: (lang: (typeof languages)[number]) => void;
}) {
  return (
    <Command className="rounded-none">
      <CommandInput placeholder="Search languages..." data-testid="input-language-search" />
      <CommandList className="max-h-[320px]">
        <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
          No language found.
        </CommandEmpty>
        <CommandGroup>
          {languages.map((lang) => (
            <CommandItem
              key={lang.code}
              value={`${lang.name} ${lang.nativeName} ${lang.code}`}
              onSelect={() => onSelect(lang)}
              className={`rounded-none py-2.5 px-3 cursor-pointer ${
                selected.code === lang.code ? 'bg-primary/10' : ''
              }`}
              data-testid={`option-language-${lang.code}`}
            >
              <span className="text-lg leading-none mr-1">{lang.flag}</span>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold leading-tight truncate">{lang.name}</span>
                <span className="text-xs text-muted-foreground leading-tight truncate">
                  {lang.nativeName} · {lang.code}
                </span>
              </div>
              {selected.code === lang.code && (
                <Check className="w-4 h-4 text-primary ml-auto shrink-0" />
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      <div className="border-t border-border py-2.5 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-center gap-2">
        <Globe className="w-3.5 h-3.5" />
        {languages.length} languages
      </div>
    </Command>
  );
}
