import {
  LoaderCircle,
} from "lucide-react";

const LoadingSpinner = ({
  title = "Loading",
  description = "Please wait while we process your request.",
}) => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-accent-soft text-accent shadow-soft">
          <LoaderCircle className="h-10 w-10 animate-spin" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-primary">
          {title}
        </h2>

        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;