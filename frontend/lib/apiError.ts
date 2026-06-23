import { NextResponse } from "next/server";

export interface ApiErrorResponse {
  success: false;
  error: string;
  detail?: string;
  code?: string;
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
}

export function apiError(
  message: string,
  status = 400,
  detail?: string,
  code?: string
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    { success: false, error: message, detail, code },
    { status }
  );
}

export function apiSuccess<T>(data: T, status = 200): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiUnauthorized(detail = "Yetkisiz erişim.") {
  return apiError("Unauthorized", 401, detail, "UNAUTHORIZED");
}

export function apiNotFound(detail = "Kaynak bulunamadı.") {
  return apiError("Not Found", 404, detail, "NOT_FOUND");
}

export function apiServerError(detail = "Sunucu hatası.") {
  return apiError("Internal Server Error", 500, detail, "SERVER_ERROR");
}
