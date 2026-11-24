interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, className }: Props) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </div>
  );
}
