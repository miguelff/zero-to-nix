import { state } from "lib/state";
import { useEffect, useState } from "react";

let script: string;

const Script = () => {
  const [language] = state((s) => [s.language]);
  const [_, setLang] = useState<string>();

  useEffect(() => {
    setLang(language);
    const lang = language.toLowerCase();
    const dir = `nix-${lang}`;
    script = `mkdir ${dir} && cd ${dir}\nnix flake init --template "github:DeterminateSystems/template?dir=${lang}"`;
  }, [language]);

  return (
    <pre>
      <code className="language-shell">{script}</code>
    </pre>
  );
};

export default Script;