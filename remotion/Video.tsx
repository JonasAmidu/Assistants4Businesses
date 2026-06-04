import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const teal = "#6ee7e2";
const coral = "#ff7a68";
const ink = "#061114";
const panel = "rgba(255, 255, 255, 0.08)";
const line = "rgba(255, 255, 255, 0.18)";

const services = [
  "WhatsApp access",
  "Coding workspaces",
  "Daily task automation",
  "Always-on support",
];

const tasks = [
  "Capture new enquiry",
  "Draft client response",
  "Update workflow board",
  "Send daily summary",
];

const messageRows = [
  {side: "client", text: "Can you chase the lead list and prep follow-ups?"},
  {side: "assistant", text: "Done. I found 12 warm leads and drafted replies."},
  {side: "client", text: "Also check tomorrow's delivery schedule."},
  {side: "assistant", text: "Checked. Two conflicts flagged for review."},
];

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 16, end - 16, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideY = (frame: number, start: number, from = 24) =>
  interpolate(frame, [start, start + 22], [from, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

const base: React.CSSProperties = {
  background:
    "radial-gradient(circle at 20% 18%, rgba(110, 231, 226, 0.28), transparent 28%), radial-gradient(circle at 82% 30%, rgba(255, 122, 104, 0.22), transparent 26%), linear-gradient(135deg, #061114 0%, #102329 50%, #152624 100%)",
  color: "#f7fbfb",
  fontFamily: "Inter, Arial, sans-serif",
  overflow: "hidden",
};

const pill: React.CSSProperties = {
  alignItems: "center",
  border: `1px solid ${line}`,
  borderRadius: 999,
  display: "flex",
  gap: 10,
  padding: "12px 18px",
};

const Card: React.FC<React.PropsWithChildren<{style?: React.CSSProperties}>> = ({
  children,
  style,
}) => (
  <div
    style={{
      background: panel,
      border: `1px solid ${line}`,
      borderRadius: 8,
      boxShadow: "0 28px 70px rgba(0, 0, 0, 0.26)",
      ...style,
    }}
  >
    {children}
  </div>
);

const StatusDot: React.FC<{color: string}> = ({color}) => (
  <span
    style={{
      background: color,
      borderRadius: 999,
      display: "inline-block",
      height: 11,
      width: 11,
    }}
  />
);

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = spring({frame, fps: 30, config: {damping: 18, stiffness: 90}});
  return (
    <AbsoluteFill
      style={{
        opacity: fade(frame, 0, 105),
        padding: 72,
        transform: `translateY(${slideY(frame, 0)}px)`,
      }}
    >
      <div style={{fontSize: 24, fontWeight: 900, letterSpacing: 1, color: teal}}>
        Assistants4Businesses
      </div>
      <div style={{display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 54, marginTop: 46}}>
        <div>
          <h1 style={{fontSize: 62, lineHeight: 0.98, margin: 0, maxWidth: 620}}>
            Business support that moves while you work.
          </h1>
          <p style={{color: "#cfe0e4", fontSize: 23, lineHeight: 1.38, marginTop: 24, maxWidth: 600}}>
            A practical assistant layer for messages, coding environments, daily workflows, and
            always-on operations.
          </p>
          <div style={{display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26, maxWidth: 560}}>
            {services.map((service) => (
              <div key={service} style={{...pill, padding: "11px 16px"}}>
                <StatusDot color={service.includes("Coding") ? coral : teal} />
                <span style={{fontSize: 17, fontWeight: 800}}>{service}</span>
              </div>
            ))}
          </div>
        </div>
        <Card style={{height: 430, padding: 28, transform: `scale(${0.92 + scale * 0.08})`}}>
          <div style={{alignItems: "center", display: "flex", justifyContent: "space-between"}}>
            <strong style={{fontSize: 23}}>Automation hub</strong>
            <div style={{display: "flex", gap: 8}}>
              <StatusDot color={coral} />
              <StatusDot color="#f7d45f" />
              <StatusDot color={teal} />
            </div>
          </div>
          <div style={{display: "grid", gap: 16, marginTop: 26}}>
            {tasks.map((task, index) => (
              <div
                key={task}
                style={{
                  alignItems: "center",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  display: "grid",
                  gridTemplateColumns: "32px 1fr 76px",
                  opacity: interpolate(frame, [18 + index * 8, 38 + index * 8], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  padding: 16,
                }}
              >
                <StatusDot color={teal} />
                <span style={{fontSize: 19, fontWeight: 800}}>{task}</span>
                <span style={{color: "#9be7d9", fontSize: 15, fontWeight: 900}}>LIVE</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

const WorkflowScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: fade(frame, 92, 225),
        padding: 58,
        transform: `translateY(${slideY(frame, 92, 18)}px)`,
      }}
    >
      <div style={{display: "grid", gridTemplateColumns: "420px 1fr", gap: 44, height: "100%"}}>
        <Card style={{padding: 24}}>
          <div style={{color: teal, fontSize: 20, fontWeight: 900}}>WhatsApp request</div>
          <div style={{display: "grid", gap: 17, marginTop: 28}}>
            {messageRows.map((row, index) => {
              const inFrame = frame - (106 + index * 16);
              return (
                <div
                  key={row.text}
                  style={{
                    alignSelf: row.side === "client" ? "start" : "end",
                    background: row.side === "client" ? "rgba(255,255,255,0.1)" : "rgba(110,231,226,0.18)",
                    border: `1px solid ${row.side === "client" ? line : "rgba(110,231,226,0.45)"}`,
                    borderRadius: 8,
                    fontSize: 19,
                    fontWeight: 760,
                    lineHeight: 1.28,
                    opacity: interpolate(inFrame, [0, 12], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                    padding: 16,
                    transform: `translateY(${interpolate(inFrame, [0, 12], [18, 0], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })}px)`,
                    width: row.side === "client" ? 330 : 355,
                  }}
                >
                  {row.text}
                </div>
              );
            })}
          </div>
        </Card>
        <Card style={{padding: 28}}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <strong style={{fontSize: 28}}>Assistant workflow</strong>
            <span style={{color: "#9be7d9", fontSize: 18, fontWeight: 900}}>SYNCING</span>
          </div>
          <div style={{display: "grid", gap: 18, marginTop: 34}}>
            {tasks.map((task, index) => {
              const progress = interpolate(frame, [122 + index * 18, 164 + index * 18], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div key={task}>
                  <div style={{display: "flex", justifyContent: "space-between", marginBottom: 10}}>
                    <span style={{fontSize: 21, fontWeight: 850}}>{task}</span>
                    <span style={{color: progress > 0.95 ? teal : "#d9e7e9", fontSize: 17, fontWeight: 900}}>
                      {progress > 0.95 ? "DONE" : "RUNNING"}
                    </span>
                  </div>
                  <div style={{background: "rgba(255,255,255,0.1)", borderRadius: 999, height: 12}}>
                    <div
                      style={{
                        background: `linear-gradient(90deg, ${teal}, ${coral})`,
                        borderRadius: 999,
                        height: "100%",
                        width: `${progress * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

const FinalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 12), [-1, 1], [0.92, 1.06]);
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: fade(frame, 212, 360),
        padding: 70,
        textAlign: "center",
      }}
    >
      <div
        style={{
          border: `2px solid rgba(110, 231, 226, 0.42)`,
          borderRadius: 999,
          height: 132,
          position: "absolute",
          transform: `scale(${pulse})`,
          width: 132,
        }}
      />
      <div style={{color: teal, fontSize: 22, fontWeight: 950, marginBottom: 22}}>
        Messages | Workflows | Code | Operations
      </div>
      <h2 style={{fontSize: 70, lineHeight: 1, margin: 0, maxWidth: 980}}>
        Your assistant stack, ready for real business work.
      </h2>
      <p style={{color: "#d4e5e8", fontSize: 26, lineHeight: 1.45, marginTop: 26, maxWidth: 760}}>
        Install the workflows once. Keep useful work moving every day.
      </p>
      <div
        style={{
          background: `linear-gradient(90deg, ${teal}, ${coral})`,
          borderRadius: 999,
          color: ink,
          fontSize: 24,
          fontWeight: 950,
          marginTop: 38,
          padding: "17px 28px",
        }}
      >
        Build the assistant your team actually uses
      </div>
    </AbsoluteFill>
  );
};

export const AssistantBusinessVideo: React.FC = () => {
  const {width, height} = useVideoConfig();
  return (
    <AbsoluteFill style={base}>
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          height: height - 36,
          left: 18,
          position: "absolute",
          top: 18,
          width: width - 36,
        }}
      />
      <IntroScene />
      <WorkflowScene />
      <FinalScene />
    </AbsoluteFill>
  );
};
