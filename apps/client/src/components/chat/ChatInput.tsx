import React from "react";

import { IonButton, IonInput, IonItem } from "@ionic/react";
import PaperPlaneIcon from "@components/svgs/PaperPlaneIcon";

const ChatInput: React.FC<{
  input: string;
  setInput: (value: string) => void;
  handleSubmit: () => void;
}> = ({ input, setInput, handleSubmit }) => {
  return (
    <form
      className="w-full flex items-center justify-center relative"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <IonItem
        lines="none"
        className="flex items-center justify-center max-w-[768px] w-full"
        color="primary-dark"
      >
        <IonInput
          type="text"
          placeholder="Say something..."
          className="rounded-full bg-secondary-dark pl-[24px]! pr-[6px]! w-full text-[16px] py-1! focus:border-none!"
          value={input}
          onIonInput={(e) => setInput(e.detail.value!)}
        >
          <IonButton
            className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] p-0! m-0!"
            shape="round"
            type="submit"
            slot="end"
            fill="clear"
            style={{
              "--ripple-color": "var(--ion-color-primary-dark)",
              "--color-hover": "var(--ion-color-primary-dark)",
              "--background-hover": "var(--ion-color-primary-dark)",
            }}
            disabled={input.trim() === ""}
          >
            <PaperPlaneIcon className="text-white" />
          </IonButton>
        </IonInput>
      </IonItem>
    </form>
  );
};

export default ChatInput;
