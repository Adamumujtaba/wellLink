import { TypeAnimation } from "react-type-animation";

function EmptyState({ button }: { button: React.ReactElement }) {
  return (
    <div>
      <div style={{ marginBottom: "40px" }}>{button}</div>
      <div>
        <TypeAnimation
          sequence={[
            "Welcome to WellLink! Track your symptoms, get personalized health insights, and receive recommendations on how to manage your wellness.",
            1000, // wait 1s before changing to the next step
            "If needed, our AI will guide you on when to consult a doctor.",
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ display: "inline-block" }}
          repeat={Infinity}
        />
      </div>
    </div>
  );
}

export default EmptyState;
