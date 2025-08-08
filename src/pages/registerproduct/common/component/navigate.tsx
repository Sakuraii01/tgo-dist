export type StepNavigateProps = {
  title: {
    title: string;
    key: number;
  }[];
  current_step: number;
};
export type TabNavigateProps = {
  title: {
    title: string;
    total_methods: number;
  }[];
  current_method: number;
};
export const TabNavigate = () => {};

export type MethodNavigateProps = {
  title: {
    title: string;
    key: number;
  };
  current_step: number;
};
export const MethodNavigate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="method-navigate" data-accordion="collapse">
      {children}
    </div>
  );
};
