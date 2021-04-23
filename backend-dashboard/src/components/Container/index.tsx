import React from 'react';

interface ContainerProps {
  children: any;
}

const Container: React.FC<ContainerProps> = ({ children }: ContainerProps) => {
  return <div className="p-2 container min-w-full">{children}</div>;
};

export default Container;
