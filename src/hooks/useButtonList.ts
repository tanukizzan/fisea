import { useState, useEffect } from 'react';
import { DomainItem } from 'types';
import domainList from 'components/ButtonArea/ButtonComponents/domainList.json';
import { useSettings } from 'contexts/SettingsContext';

export const useButtonList = () => {
  const { categories } = useSettings();
  const [buttonList, setButtonList] = useState<DomainItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const activeButtons = categories
      .filter(category => category.isActive)
      .flatMap(category => 
        category.list
          .filter(button => button.isActive)
          .map(button => {
            const domainItem = (domainList as DomainItem[]).find(
              item => item.name === button.name
            );
            return domainItem;
          })
          .filter((item): item is DomainItem => item !== undefined)
      );

    setButtonList(activeButtons);
    setIsLoading(false);
  }, [categories]);

  return { buttonList, isLoading };
}; 