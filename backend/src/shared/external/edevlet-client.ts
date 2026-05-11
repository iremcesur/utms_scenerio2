import { DocumentVerificationBadge } from "../types";

export interface EDevletVerifyOutcome {
  badge: DocumentVerificationBadge;
  message?: string;
}

export class EDevletMockClient {
  private reachable = true;
  private readonly badgeOverrides = new Map<string, DocumentVerificationBadge>();

  setReachable(value: boolean): void {
    this.reachable = value;
  }

  setOutcomeForDocument(documentId: string, badge: DocumentVerificationBadge): void {
    this.badgeOverrides.set(documentId, badge);
  }

  reset(): void {
    this.reachable = true;
    this.badgeOverrides.clear();
  }

  verify(documentId: string, hasBarcode: boolean): EDevletVerifyOutcome {
    if (!this.reachable) {
      throw new Error("E_DEVLET_UNREACHABLE");
    }
    if (!hasBarcode) {
      return {
        badge: DocumentVerificationBadge.ManualCheckRequired,
        message: "No barcode/QR detected",
      };
    }
    const override = this.badgeOverrides.get(documentId);
    if (override) {
      return { badge: override };
    }
    return { badge: DocumentVerificationBadge.Verified };
  }
}
