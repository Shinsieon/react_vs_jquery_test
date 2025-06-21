// src/components/Flex.jsx

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "row" | "column";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  align?: "stretch" | "flex-start" | "flex-end" | "center";
  gap?: number | string;
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
}

const Flex = ({
  children,
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  gap = 0,
  wrap = "nowrap",
  style = {},
  ...rest
}: FlexProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        gap,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Flex;
