export const GA_ID = "G-TLT6TW66LY";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  action: string,
  params?: { category?: string; label?: string; value?: number }
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: params?.category ?? "engagement",
      event_label: params?.label,
      value: params?.value,
    });
  }
}

// Hazır event fonksiyonları — import edip çağır
export const events = {
  clickHaritayiAc: () => trackEvent("click_haritayi_ac", { category: "conversion" }),
  clickAlanSec: (pixels: number) => trackEvent("click_alan_sec", { category: "conversion", value: pixels }),
  clickOdemeye: (price: number) => trackEvent("begin_checkout", { category: "ecommerce", value: price }),
  clickSatinAl: (price: number) => trackEvent("purchase", { category: "ecommerce", value: price }),
  clickIndirimKodu: () => trackEvent("apply_discount_code", { category: "engagement" }),
  clickReferans: () => trackEvent("click_referans", { category: "engagement" }),
  clickTikTokPopup: () => trackEvent("tiktok_popup_open", { category: "social" }),
  submitTikTokEmail: () => trackEvent("tiktok_email_submitted", { category: "social" }),
  clickSehirSayfasi: (sehir: string) => trackEvent("view_sehir", { category: "seo", label: sehir }),
  clickWhatsapp: () => trackEvent("click_whatsapp", { category: "contact" }),
  addFavorite: () => trackEvent("add_favorite", { category: "engagement" }),
  brandSearch: (query: string) => trackEvent("brand_search", { category: "search", label: query }),
};
