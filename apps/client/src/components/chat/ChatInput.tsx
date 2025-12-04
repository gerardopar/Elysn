import React, { useMemo } from "react";

import {
  IonRow,
  IonFooter,
  IonToolbar,
  IonSpinner,
  IonTextarea,
} from "@ionic/react";
import PaperPlaneIcon from "@components/svgs/PaperPlaneIcon";

import { INPUT_PLACEHOLDERS } from "./chat.helpers";
import getRandomString from "@helpers/string.helpers";

export const ChatInput: React.FC<{
  input: string;
  setInput: (value: string) => void;
  handleSubmit: () => void;
  mode?: "default" | "fixed";
  isLoading?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}> = ({
  input,
  setInput,
  handleSubmit,
  mode = "default",
  isLoading,
  onFocus,
  onBlur,
}) => {
  const placeholder = useMemo(() => getRandomString(INPUT_PLACEHOLDERS), []);

  const inputForm = (
    <form
      className="w-full flex items-center justify-center relative"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <IonRow
        className="flex items-center justify-center max-w-[768px] w-full relative"
        color="primary-dark"
      >
        <div
          className={`w-full bg-secondary-dark rounded-[16px] flex items-end justify-center gap-2 px-2 pb-2`}
        >
          <IonTextarea
            mode="ios"
            spellCheck
            inputMode="text"
            autoGrow
            placeholder={placeholder}
            className="flex-1 text-[16px] focus:border-none! focus:outline-none! ion-no-padding mt-[16px] pl-[12px]! max-h-[240px] overflow-auto"
            value={input}
            onIonInput={(e) => setInput(e.detail.value!)}
            style={{
              "--highlight-color-focused": "var(--color-primary-light)",
              "--highlight-color": "var(--color-primary-light)",
            }}
            rows={1}
            onIonFocus={onFocus}
            onIonBlur={onBlur}
          />
          <button
            className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] shrink-0 p-0! m-0! mb-1 z-10 bg-primary-light rounded-full! flex items-center justify-center"
            type="submit"
            disabled={input.trim() === ""}
          >
            {isLoading ? (
              <IonSpinner name="crescent" color="primary-dark" />
            ) : (
              <PaperPlaneIcon className="text-primary-dark" size="small" />
            )}
          </button>
        </div>
      </IonRow>
    </form>
  );

  if (mode === "fixed") {
    return (
      <IonFooter className="ion-no-border" color="primary-dark">
        <IonToolbar className="ion-no-border" color="primary-dark">
          <div className="ion-padding">{inputForm}</div>
        </IonToolbar>
      </IonFooter>
    );
  }

  return inputForm;
};

export default ChatInput;
