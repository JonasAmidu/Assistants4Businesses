import React from "react";
import {Composition} from "remotion";
import {AssistantBusinessVideo} from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Assistants4BusinessesVideo"
      component={AssistantBusinessVideo}
      durationInFrames={360}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
