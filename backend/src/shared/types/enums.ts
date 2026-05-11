export enum ApplicationStatus {
  Draft = "DRAFT",
  PendingDocumentUpload = "PENDING_DOCUMENT_UPLOAD",
  PendingOidbVerification = "PENDING_OIDB_VERIFICATION",
  IntakeVerified = "INTAKE_VERIFIED",
  PendingYgkForwarding = "PENDING_YGK_FORWARDING",
  InReviewYdyo = "IN_REVIEW_YDYO",
  InReviewYgk = "IN_REVIEW_YGK",
  ReturnedForCorrection = "RETURNED_FOR_CORRECTION",
  RejectedAtIntake = "REJECTED_AT_INTAKE",
  RankedAsil = "RANKED_ASIL",
  RankedYedek = "RANKED_YEDEK",
  RankedRed = "RANKED_RED",
  IntibakCompleted = "INTIBAK_COMPLETED",
  PendingDeansOfficeReview = "PENDING_DEANS_OFFICE_REVIEW",
  ApprovedFacultyBoard = "APPROVED_FACULTY_BOARD",
  ReadyForPublication = "READY_FOR_PUBLICATION",
  ResultsPublished = "RESULTS_PUBLISHED",
}

export enum DocumentType {
  Transcript = "TRANSCRIPT",
  YksResult = "YKS_RESULT",
  StudentCertificate = "STUDENT_CERTIFICATE",
  LanguageProof = "LANGUAGE_PROOF",
  Curriculum = "CURRICULUM",
  CourseContents = "COURSE_CONTENTS",
  Portfolio = "PORTFOLIO",
}

export enum DocumentVerificationBadge {
  Verified = "VERIFIED",
  ManualCheckRequired = "MANUAL_CHECK_REQUIRED",
  Invalid = "INVALID",
  Expired = "EXPIRED",
  NotApplicable = "NOT_APPLICABLE",
}

export enum UserRole {
  Student = "STUDENT",
  OidbOfficer = "OIDB_OFFICER",
  YdyoOfficer = "YDYO_OFFICER",
  YgkMember = "YGK_MEMBER",
  YgkChair = "YGK_CHAIR",
  DeansOfficeStaff = "DEANS_OFFICE_STAFF",
  FacultyBoardMember = "FACULTY_BOARD_MEMBER",
  SystemAdmin = "SYSTEM_ADMIN",
}

export enum MappingStatus {
  SuggestedMatch = "SUGGESTED_MATCH",
  Approved = "APPROVED",
  ManualOverride = "MANUAL_OVERRIDE",
  NotExempt = "NOT_EXEMPT",
  NoPreviousEquivalent = "NO_PREVIOUS_EQUIVALENT",
  PendingReview = "PENDING_REVIEW",
}

export enum RankingCategory {
  Asil = "ASIL",
  Yedek = "YEDEK",
  Red = "RED",
}

export enum PackageStatus {
  Draft = "DRAFT",
  Sent = "SENT",
  ApprovedFacultyBoard = "APPROVED_FACULTY_BOARD",
  Returned = "RETURNED",
}

export enum NotificationChannel {
  Email = "EMAIL",
  DashboardAlert = "DASHBOARD_ALERT",
}
