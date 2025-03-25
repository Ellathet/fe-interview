import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';

interface PaginatedSelectProps {
  field: {
    onChange: (value: string) => void;
    value: string;
    disabled?: boolean;
  };
  fetchOptions: (
    page: number,
    pageSize: number,
  ) => Promise<{ id: string; name: string }[]>;
  placeholder?: string;
  pageSize?: number;
}

export const PaginatedSelect = ({
  field,
  fetchOptions,
  placeholder = 'Selecione uma opção',
  pageSize = 10,
}: PaginatedSelectProps) => {
  const [options, setOptions] = useState<{ id: string; name: string }[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastLoadedPage = useRef<number>(0);

  useEffect(() => {
    const loadOptions = async () => {
      if (!hasMore || loading || page === lastLoadedPage.current) return;

      setLoading(true);
      const newOptions = await fetchOptions(page, pageSize);

      setOptions((prev) => {
        const ids = new Set(prev.map((item) => item.id));
        const filteredOptions = newOptions.filter((item) => !ids.has(item.id));
        return [...prev, ...filteredOptions];
      });

      setLoading(false);
      lastLoadedPage.current = page;

      if (newOptions.length < pageSize) {
        setHasMore(false);
      }
    };

    loadOptions();
  }, [page, pageSize, hasMore]);

  const lastItemObserver = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <Select
      onValueChange={field.onChange}
      value={field.value}
      disabled={field.disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.length === 0 && !loading && (
          <div className="p-2 text-center text-sm text-gray-500">
            Nenhuma opção encontrada
          </div>
        )}
        {options.map((option, index) => (
          <SelectItem
            key={option.id}
            value={option.id}
            ref={index === options.length - 1 ? lastItemObserver : null}
          >
            {option.name}
          </SelectItem>
        ))}
        {loading && (
          <div className="p-2 text-center text-sm">Carregando...</div>
        )}
      </SelectContent>
    </Select>
  );
};
