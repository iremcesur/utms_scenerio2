import { PreviousCourse } from "../types";

export interface OcrParseSuccess {
  ok: true;
  courses: PreviousCourse[];
}

export interface OcrParseFailure {
  ok: false;
  reason: "LOW_QUALITY_SCAN" | "PASSWORD_PROTECTED" | "FILE_CORRUPT";
}

export type OcrParseResult = OcrParseSuccess | OcrParseFailure;

export class OcrParserMockClient {
  private readonly transcripts = new Map<string, OcrParseResult>();

  setTranscriptFor(documentId: string, result: OcrParseResult): void {
    this.transcripts.set(documentId, result);
  }

  reset(): void {
    this.transcripts.clear();
  }

  parse(documentId: string): OcrParseResult {
    return this.transcripts.get(documentId) ?? { ok: false, reason: "LOW_QUALITY_SCAN" };
  }
}
