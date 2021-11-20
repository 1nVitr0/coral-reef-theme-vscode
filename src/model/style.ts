export type FontStyle =
  | 'italic'
  | 'bold'
  | 'underline'
  | 'italic bold'
  | 'italic underline'
  | 'bold italic'
  | 'bold underline'
  | 'underline bold'
  | 'underline italic'
  | 'italic bold underline'
  | 'italic underline bold'
  | 'bold italic underline'
  | 'bold underline italic'
  | 'underline italic bold'
  | 'underline bold italic';

export interface TokenColor {
  name?: string;
  scope: string[];
  settings: {
    foreground?: string;
    background?: string;
    fontStyle?: FontStyle;
  };
}

export interface SemanticTokenColor {
  foreground?: string;
  background?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}
