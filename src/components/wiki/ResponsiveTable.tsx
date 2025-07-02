import React, { isValidElement, Children, ReactElement, ReactNode } from 'react';

interface TableChildProps {
  children?: ReactNode;
  className?: string;
}

interface TableElementProps extends TableChildProps {
  children?: ReactNode;
}

interface TableRowProps extends TableChildProps {
  children?: ReactNode;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  header?: boolean;
}

interface ResponsiveTableProps {
  children: ReactElement<TableChildProps>;
  className?: string;
}

const isReactElement = (child: any): child is ReactElement => {
  return isValidElement(child);
};

const isTableElement = (child: any): child is ReactElement<TableElementProps> => {
  return isReactElement(child) && child.type === 'table';
};

const isTableRow = (child: any): child is ReactElement<TableRowProps> => {
  return isReactElement(child) && child.type === 'tr';
};

const isTableCell = (child: any): child is ReactElement<TableCellProps> => {
  return isReactElement(child) && (child.type === 'td' || child.type === 'th');
};

export const ResponsiveTable = ({ 
  children,
  className = '' 
}: ResponsiveTableProps) => {
  return (
    <div className="block w-full">
      <div className="sm:hidden space-y-2">
        {Children.map(children, (child) => {
          if (isTableElement(child)) {
            const tableChildren = Children.toArray(child.props.children)
              .filter(isReactElement);
              
            // Find the first header row (thead or first row in tbody if no thead)
            let headerRow: ReactElement<TableRowProps> | undefined;
            let bodyRows: ReactElement<TableRowProps>[] = [];
            
            const thead = tableChildren.find(c => c.type === 'thead');
            const tbody = tableChildren.find(c => c.type === 'tbody') || tableChildren.find(c => c.type === 'table');
            
            if (thead && isReactElement(thead)) {
              headerRow = Children.toArray(
                (thead.props as { children?: ReactNode }).children
              ).find(isTableRow) as ReactElement<TableRowProps>;
            }
            
            if (tbody && isReactElement(tbody)) {
              bodyRows = Children.toArray(
                (tbody.props as { children?: ReactNode }).children
              ).filter(isTableRow) as ReactElement<TableRowProps>[];
                
              // If no header row found, use first row as headers
              if (!headerRow && bodyRows.length > 0) {
                headerRow = bodyRows[0];
                bodyRows = bodyRows.slice(1);
              }
            }
            
            const headerCells = headerRow 
              ? Children.toArray(headerRow.props.children).filter(isTableCell)
              : [];

            return (
              <div className="block w-full">
                <div className="sm:hidden space-y-4">
                  {bodyRows.map((row, rowIndex) => {
                    if (!isTableRow(row)) return null;
                    return (
                      <div key={`row-${rowIndex}`} 
                        className="border border-gray-200 rounded p-4">
                        {Children.map(row.props.children, (cell, i) => {
                          if (!isTableCell(cell)) return null;
                          const headerText = headerCells[i]?.props.children || `Column ${i+1}`;
                          return (
                            <div key={`cell-${rowIndex}-${i}`} 
                              className="mb-2 last:mb-0">
                              <div className="font-medium text-gray-900">{headerText}</div>
                              <div className="text-gray-700">
                                {typeof cell.props.children === 'string' 
                                  ? cell.props.children 
                                  : cell.props.children}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
                <div className="hidden sm:block">
                  {children}
                </div>
              </div>
            );
          }
          return child;
        })}
      </div>
      <div className="hidden sm:block">
        {children}
      </div>
    </div>
  );
};

export const TableCell = ({ children, className = '', header = false }: TableCellProps) => {
  const baseClasses = 'p-2 sm:p-3 text-xs sm:text-sm align-top min-w-[100px]';
  const borderClass = 'border border-gray-200';
  const headerClass = header ? 'bg-gray-50 font-medium text-gray-900' : '';
  
  // Ensure children is rendered even if it's a string
  const content = typeof children === 'string' ? children : children;
  
  return header ? (
    <th className={`${baseClasses} ${borderClass} ${headerClass} ${className} sticky top-0 z-10`}>
      {content}
    </th>
  ) : (
    <td className={`${baseClasses} ${borderClass} ${className}`}>
      {content}
    </td>
  );
};
