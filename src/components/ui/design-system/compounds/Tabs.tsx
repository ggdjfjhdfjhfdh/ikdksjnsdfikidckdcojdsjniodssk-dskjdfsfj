'use client';

import React, { forwardRef, useState, useCallback } from 'react';
import { TabsProps } from '../types';
import { cn } from '../utils';
import { useId } from '../hooks';

// Context para las Tabs
const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
  variant: TabsProps['variant'];
  size: TabsProps['size'];
  orientation: TabsProps['orientation'];
  isDisabled: boolean;
  tabsId: string;
}>({ 
  activeTab: '', 
  setActiveTab: () => {}, 
  variant: 'line',
  size: 'md',
  orientation: 'horizontal',
  isDisabled: false,
  tabsId: ''
});

// Hook para usar el contexto de las Tabs
const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within a Tabs');
  }
  return context;
};

// Componente Tabs principal
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({
    defaultValue,
    value,
    onChange,
    variant = 'line',
    size = 'md',
    orientation = 'horizontal',
    isDisabled = false,
    children,
    className,
    ...props
  }, ref) => {
    const [internalActiveTab, setInternalActiveTab] = useState(defaultValue || '');
    const tabsId = useId('tabs');
    
    const activeTab = value !== undefined ? value : internalActiveTab;
    
    const setActiveTab = useCallback((tab: string) => {
      if (isDisabled) return;
      
      if (value === undefined) {
        setInternalActiveTab(tab);
      }
      onChange?.(tab);
    }, [value, onChange, isDisabled]);

    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          {
            'flex': orientation === 'vertical',
            'flex-col': orientation === 'horizontal',
          },
          className
        )}
        {...props}
      >
        <TabsContext.Provider 
          value={{ 
            activeTab, 
            setActiveTab, 
            variant, 
            size, 
            orientation, 
            isDisabled,
            tabsId
          }}
        >
          {children}
        </TabsContext.Provider>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

// Tab List
export const TabList = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { variant, orientation, size } = useTabs();
    
    const variantClasses = {
      line: {
        horizontal: 'border-b border-gray-200',
        vertical: 'border-r border-gray-200 pr-4',
      },
      enclosed: {
        horizontal: 'border-b border-gray-200',
        vertical: 'border-r border-gray-200 pr-4',
      },
      'soft-rounded': {
        horizontal: 'bg-gray-100 rounded-lg p-1',
        vertical: 'bg-gray-100 rounded-lg p-1',
      },
      'solid-rounded': {
        horizontal: 'bg-gray-100 rounded-lg p-1',
        vertical: 'bg-gray-100 rounded-lg p-1',
      },
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          {
            'flex-row space-x-1': orientation === 'horizontal',
            'flex-col space-y-1 min-w-[200px]': orientation === 'vertical',
          },
          variantClasses[variant][orientation],
          className
        )}
        role="tablist"
        aria-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabList.displayName = 'TabList';

// Tab
export const Tab = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
  isDisabled?: boolean;
}>(
  ({ value, isDisabled = false, className, children, ...props }, ref) => {
    const { activeTab, setActiveTab, variant, size, orientation, isDisabled: tabsDisabled, tabsId } = useTabs();
    
    const isActive = activeTab === value;
    const disabled = isDisabled || tabsDisabled;
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };
    
    const variantClasses = {
      line: {
        base: 'border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 transition-colors duration-200',
        active: 'border-blue-500 text-blue-600',
        inactive: 'text-gray-500',
      },
      enclosed: {
        base: 'border border-transparent rounded-t-md hover:border-gray-300 transition-colors duration-200',
        active: 'border-gray-300 border-b-white bg-white text-gray-900 -mb-px',
        inactive: 'text-gray-500 hover:text-gray-700',
      },
      'soft-rounded': {
        base: 'rounded-md transition-colors duration-200',
        active: 'bg-white text-gray-900 shadow-sm',
        inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
      },
      'solid-rounded': {
        base: 'rounded-md transition-colors duration-200',
        active: 'bg-blue-500 text-white shadow-sm',
        inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
      },
    };
    
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`${tabsId}-panel-${value}`}
        id={`${tabsId}-tab-${value}`}
        disabled={disabled}
        className={cn(
          'font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          sizeClasses[size],
          variantClasses[variant].base,
          isActive ? variantClasses[variant].active : variantClasses[variant].inactive,
          {
            'opacity-50 cursor-not-allowed': disabled,
            'cursor-pointer': !disabled,
          },
          className
        )}
        onClick={() => setActiveTab(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

// Tab Panels
export const TabPanels = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useTabs();
    
    return (
      <div
        ref={ref}
        className={cn(
          {
            'mt-4': orientation === 'horizontal',
            'ml-4 flex-1': orientation === 'vertical',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanels.displayName = 'TabPanels';

// Tab Panel
export const TabPanel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  value: string;
}>(
  ({ value, className, children, ...props }, ref) => {
    const { activeTab, tabsId } = useTabs();
    
    const isActive = activeTab === value;
    
    if (!isActive) return null;
    
    return (
      <div
        ref={ref}
        role="tabpanel"
        aria-labelledby={`${tabsId}-tab-${value}`}
        id={`${tabsId}-panel-${value}`}
        className={cn('focus:outline-none', className)}
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';

// Hook para controlar las Tabs
export const useTabsState = (defaultValue?: string) => {
  const [activeTab, setActiveTab] = useState(defaultValue || '');
  
  return {
    activeTab,
    setActiveTab,
  };
};

// Tabs simples predefinidas
export interface SimpleTabsProps {
  tabs: Array<{
    label: string;
    value: string;
    content: React.ReactNode;
    isDisabled?: boolean;
  }>;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: TabsProps['variant'];
  size?: TabsProps['size'];
  orientation?: TabsProps['orientation'];
  className?: string;
}

export const SimpleTabs = ({
  tabs,
  defaultValue,
  value,
  onChange,
  variant = 'line',
  size = 'md',
  orientation = 'horizontal',
  className,
}: SimpleTabsProps) => {
  return (
    <Tabs
      defaultValue={defaultValue || tabs[0]?.value}
      value={value}
      onChange={onChange}
      variant={variant}
      size={size}
      orientation={orientation}
      className={className}
    >
      <TabList>
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            isDisabled={tab.isDisabled}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      
      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

SimpleTabs.displayName = 'SimpleTabs';