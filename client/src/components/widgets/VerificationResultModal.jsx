import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

import Modal from "./Modal";

const TITLE_ID = "verification-result-title";

const VerificationCard = ({ type, icon: Icon, title, message, children }) => {
  const styles = {
    success: {
      wrapper: "border-success/30 bg-success/10",
      icon: "text-success",
    },
    error: {
      wrapper: "border-destructive/30 bg-destructive/10",
      icon: "text-destructive",
    },
  };

  const currentStyle = styles[type];

  return (
    <div className={`rounded-2xl border p-6 ${currentStyle.wrapper}`}>
      <div className="flex items-start gap-4">
        <Icon className={`h-8 w-8 shrink-0 ${currentStyle.icon}`} />

        <div>
          <h3 id={TITLE_ID} className="text-lg font-bold text-primary">
            {title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">{message}</p>

          {children}
        </div>
      </div>
    </div>
  );
};

const VerifiedDetails = ({ certificate }) => {
  const student = certificate?.enrollment?.student;
  const course = certificate?.enrollment?.course;

  const studentName = student
    ? `${student.first_name || ""} ${student.last_name || ""}`.trim()
    : "-";

  const details = [
    {
      label: "Certificate No",
      value: certificate?.certificate_number || "-",
    },
    {
      label: "Student Name",
      value: studentName || "-",
    },
    {
      label: "Course",
      value: course?.name || "-",
    },
    {
      label: "Level",
      value: course?.level || "-",
    },
    {
      label: "Grade",
      value: certificate?.grade || "-",
    },
    {
      label: "Issue Date",
      value: formatDate(certificate?.issue_date),
    },
    {
      label: "Expiry Date",
      value: formatDate(certificate?.expiry_date),
    },
    {
      label: "Status",
      value: certificate?.status || "-",
    },
  ];

  return (
    <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
      {details.map((item) => (
        <div key={item.label}>
          <dt className="text-muted-foreground">{item.label}</dt>
          <dd className="font-medium capitalize">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
};

const VerificationResultModal = ({ result, isOpen, onClose }) => {
  if (!result) return null;

  const renderResultContent = () => {
    if (result.status === "validation_error") {
      return (
        <VerificationCard
          type="error"
          icon={AlertCircle}
          title="Invalid Certificate"
          message={result.message}
        />
      );
    }

    if (result.status === "verified") {
      return (
        <VerificationCard
          type="success"
          icon={CheckCircle2}
          title="Certificate Verified"
          message="This certificate is authentic and issued by Axis University."
        >
          <VerifiedDetails certificate={result.data} />
        </VerificationCard>
      );
    }

    return (
      <VerificationCard
        type="error"
        icon={XCircle}
        title="Not Found"
        message="No certificate matches the number provided. Please check and try again, or contact our office."
      />
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} titleId={TITLE_ID}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent">
            <CheckCircle2 className="h-6 w-6 text-accent-foreground" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Certificate Verification Result
            </p>

            <h2 className="text-lg font-bold text-primary">
              Verification Status
            </h2>
          </div>
        </div>

        {renderResultContent()}
      </div>
    </Modal>
  );
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

export default VerificationResultModal;