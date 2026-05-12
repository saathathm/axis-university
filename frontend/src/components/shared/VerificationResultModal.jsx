import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import Modal from "@/components/shared/Modal";

const VerificationResultModal = ({ result, isOpen, onClose }) => {
  if (!result) return null;

  const titleId = "verification-result-title";

  const renderContent = () => {
    if (result.status === "validation_error") {
      return (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-8 w-8 shrink-0 text-destructive" />
            <div>
              <h3 id={titleId} className="text-lg font-bold text-primary">Invalid Details</h3>
              <p className="mt-1 text-sm text-muted-foreground">{result.message}</p>
            </div>
          </div>
        </div>
      );
    }

    if (result.status === "verified") {
      return (
        <div className="rounded-2xl border border-success/30 bg-success/10 p-6">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="h-8 w-8 shrink-0 text-success" />
            <div>
              <h3 id={titleId} className="text-lg font-bold text-primary">Certificate Verified</h3>
              <p className="mt-1 text-sm text-muted-foreground">This certificate is authentic and issued by Axis University.</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><dt className="text-muted-foreground">Name</dt><dd className="font-medium">{result.name}</dd></div>
                <div><dt className="text-muted-foreground">Program</dt><dd className="font-medium">{result.program}</dd></div>
                <div><dt className="text-muted-foreground">Year</dt><dd className="font-medium">{result.year}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6">
        <div className="flex items-start gap-4">
          <XCircle className="h-8 w-8 shrink-0 text-destructive" />
          <div>
            <h3 id={titleId} className="text-lg font-bold text-primary">Not Found</h3>
            <p className="mt-1 text-sm text-muted-foreground">No certificate matches the details provided. Please check and try again, or contact our office.</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} titleId={titleId}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent">
            <CheckCircle2 className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Certificate Verification Result</p>
            <h2 className="text-lg font-bold text-primary">Verification Status</h2>
          </div>
        </div>
        {renderContent()}
      </div>
    </Modal>
  );
};

export default VerificationResultModal;