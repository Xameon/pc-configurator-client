import { useState } from 'react';
import { ReactComponent as LangIcon } from '../../assets/icons/language.svg';
import Button from '../button/button.component';

import i18n from '../../i18next/i18n.js';
import { LANGUAGES } from '../../i18next/languages.js';

import './lang-changer.styles.scss';

const LangChanger = () => {
  const [langListOpened, setLangListOpened] = useState(false);

  const toggleLangList = () => {
    setLangListOpened(!langListOpened);
  };

  return (
    <div className='lang-changer-container'>
      <LangIcon
        className={`lang-icon ${langListOpened && 'active'}`}
        onClick={toggleLangList}
      />
      <ul className={`languages-list ${langListOpened && 'active'}`}>
        {LANGUAGES.map(({ ISOCode, language }, idx) => (
          <li key={idx}>
            <Button
              buttonStyle='language'
              onClick={() => i18n.changeLanguage(ISOCode)}
            >
              {language}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LangChanger;
