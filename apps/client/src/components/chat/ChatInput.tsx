import React from "react";

import {
  IonButton,
  IonInput,
  IonItem,
  IonFooter,
  IonToolbar,
} from "@ionic/react";
import PaperPlaneIcon from "@components/svgs/PaperPlaneIcon";

import { INPUT_PLACEHOLDERS } from "./chat.helpers";

import getRandomString from "@helpers/string.helpers";

const ChatInput: React.FC<{
  input: string;
  setInput: (value: string) => void;
  handleSubmit: () => void;
  mode?: "default" | "fixed";
}> = ({ input, setInput, handleSubmit, mode = "default" }) => {
  const placeholder = getRandomString(INPUT_PLACEHOLDERS);

  const inputForm = (
    <form
      className="w-full flex items-center justify-center relative"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <IonItem
        lines="none"
        className="flex items-center justify-center max-w-[768px] w-full relative"
        color="primary-dark"
        style={{
          "--inner-padding-start": 0,
          "--inner-padding-end": 0,
          "--padding-start": 0,
          "--padding-end": 0,
          "--min-height": 0,
          "--inner-min-height": 0,
        }}
      >
        <IonInput
          type="text"
          placeholder={placeholder}
          className="rounded-full bg-secondary-dark pl-[24px]! pr-[56px]! w-full text-[16px] py-1! focus:border-none!"
          value={input}
          onIonInput={(e) => setInput(e.detail.value!)}
        />
        <IonButton
          className="absolute right-[6px] top-1/2 -translate-y-1/2 min-h-[40px] min-w-[40px] h-[40px] w-[40px] p-0! m-0! z-10"
          shape="round"
          type="submit"
          fill="clear"
          style={{
            "--ripple-color": "var(--ion-color-primary-dark)",
            "--color-hover": "var(--ion-color-primary-dark)",
            "--background-hover": "var(--ion-color-primary-dark)",
            "--background": "var(--ion-color-primary-light)",
          }}
          disabled={input.trim() === ""}
        >
          <PaperPlaneIcon className="text-primary-dark" size="small" />
        </IonButton>
      </IonItem>
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
