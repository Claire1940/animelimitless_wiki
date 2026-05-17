"use client";

import { Suspense, lazy } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  Layers,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://animelimitless.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Anime Limitless Wiki",
        description:
          "Complete Anime Limitless Wiki covering codes, souls, races, traits, bosses, islands, and progression tips for Roblox players.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Anime Limitless - Roblox Anime RPG",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Anime Limitless Wiki",
        alternateName: "Anime Limitless",
        url: siteUrl,
        description:
          "Complete Anime Limitless Wiki resource hub for codes, souls, races, traits, bosses, and progression guides.",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Anime Limitless Wiki - Roblox Anime RPG",
        },
        sameAs: [
          "https://www.roblox.com/games/99383863544987/Anime-Limitless",
          "https://discord.com/invite/ca8tz9zr4C",
          "https://trello.com/b/UK3Ggwan/anime-limitless",
          "https://www.youtube.com/watch?v=oddkgLo11zM",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Anime Limitless",
        gamePlatform: ["PC", "Mobile", "Console", "Roblox"],
        applicationCategory: "Game",
        genre: ["Anime", "RPG", "Action", "Adventure"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 1,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://www.roblox.com/games/99383863544987/Anime-Limitless",
        },
      },
      {
        "@type": "VideoObject",
        name: "Anime Limitless Gameplay Showcase",
        description:
          "Official Anime Limitless video featuring the gameplay preview focused on beginner progression, souls, and combat systems.",
        uploadDate: "2026-03-12",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/oddkgLo11zM",
        url: "https://www.youtube.com/watch?v=oddkgLo11zM",
      },
    ],
  };

  const mobileBannerAd = getPreferredMobileBannerSelection();

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 左侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x300"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300}
        />
      </aside>

      {/* 右侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x600"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600}
        />
      </aside>

      {/* 广告位 1: 移动端横幅 Sticky */}
      {/* <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div> */}

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("beginner-guide")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href="https://www.roblox.com/games/99383863544987/Anime-Limitless"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="oddkgLo11zM"
              title="Anime Limitless Gameplay Showcase"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              // 映射卡片索引到 section ID
              const sectionIds = [
                "codes",
                "beginner-guide",
                "souls-guide",
                "race-trait-tier-list",
                "stats-farming-guide",
                "haki-guide",
                "bosses-drops-guide",
                "trello-discord-guide",
              ];
              const sectionId = sectionIds[index];

              return (
                <a
                  key={index}
                  href={`#${sectionId}`}
                  onClick={(event) => { event.preventDefault(); scrollToSection(sectionId); }}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* Latest Updates Section */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Codes */}
      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.animeLimitlessCodes.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.animeLimitlessCodes.intro}</p>
          </div>
          <div className="scroll-reveal space-y-3 md:space-y-4 mb-8 md:mb-10">
            {t.modules.animeLimitlessCodes.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div><h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">{step.title}</h3><p className="text-sm md:text-base text-muted-foreground">{step.description}</p></div>
              </div>
            ))}
          </div>
          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4"><BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" /><h3 className="font-bold text-base md:text-lg">Quick Tips</h3></div>
            <ul className="space-y-2">{t.modules.animeLimitlessCodes.quickTips.map((tip: string, index: number) => (<li key={index} className="flex items-start gap-2"><Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" /><span className="text-muted-foreground text-sm">{tip}</span></li>))}</ul>
          </div>
        </div>
      </section>

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} className="hidden md:flex" />

      {/* Module 2: Beginner Guide */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl"><div className="text-center mb-12 scroll-reveal"><h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeLimitlessBeginnerGuide.title}</h2><p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeLimitlessBeginnerGuide.intro}</p></div><div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">{t.modules.animeLimitlessBeginnerGuide.cards.map((card: any, index: number) => (<div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"><h3 className="font-bold text-lg mb-2 text-[hsl(var(--nav-theme-light))]">{card.name}</h3><p className="text-muted-foreground text-sm">{card.description}</p></div>))}</div><div className="scroll-reveal flex flex-wrap gap-3 justify-center">{t.modules.animeLimitlessBeginnerGuide.milestones.map((m: string, i: number) => (<span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm"><Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />{m}</span>))}</div></div>
      </section>

      {/* Module 3: Souls Guide */}
      <section id="souls-guide" className="scroll-mt-24 px-4 py-20"><div className="container mx-auto max-w-5xl"><div className="text-center mb-12 scroll-reveal"><h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeLimitlessSoulsGuide.title}</h2><p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeLimitlessSoulsGuide.intro}</p></div><div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{t.modules.animeLimitlessSoulsGuide.items.map((item: any, index: number) => (<div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"><div className="flex items-center gap-3 mb-3"><Sparkles className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" /><span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{item.type}</span></div><h3 className="font-bold mb-2">{item.name}</h3><p className="text-muted-foreground text-sm">{item.description}</p></div>))}</div></div></section>

      {/* Module 4: Race and Trait Tier List */}
      <section id="race-trait-tier-list" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"><div className="container mx-auto max-w-5xl"><div className="text-center mb-12 scroll-reveal"><h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeLimitlessRaceAndTraitTierList.title}</h2><p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeLimitlessRaceAndTraitTierList.intro}</p></div><div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">{t.modules.animeLimitlessRaceAndTraitTierList.solutions.map((s: any, index: number) => (<div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"><div className="flex items-center gap-2 mb-3"><h3 className="font-bold">{s.name}</h3><span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{s.role}</span></div><p className="text-muted-foreground text-sm">{s.description}</p></div>))}</div><div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl"><div className="flex items-center gap-2 mb-4"><Layers className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" /><h3 className="font-bold">Priority Notes</h3></div><ul className="space-y-2">{t.modules.animeLimitlessRaceAndTraitTierList.managementTips.map((tip: string, i: number) => (<li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" /><span className="text-muted-foreground text-sm">{tip}</span></li>))}</ul></div></div></section>

      {/* Module 5: Stats Farming Guide */}
      <section id="stats-farming-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"><div className="container mx-auto max-w-5xl"><div className="text-center mb-12 scroll-reveal"><h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeLimitlessStatsFarmingGuide.title}</h2><p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeLimitlessStatsFarmingGuide.intro}</p></div><div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">{t.modules.animeLimitlessStatsFarmingGuide.cards.map((card: any, index: number) => (<div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"><h3 className="font-bold text-lg mb-2 text-[hsl(var(--nav-theme-light))]">{card.name}</h3><p className="text-muted-foreground text-sm">{card.description}</p></div>))}</div><div className="scroll-reveal grid grid-cols-2 md:grid-cols-4 gap-4">{t.modules.animeLimitlessStatsFarmingGuide.highlights.map((h: string, i: number) => (<div key={i} className="p-4 bg-white/5 border border-border rounded-xl text-center hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"><TrendingUp className="w-6 h-6 text-[hsl(var(--nav-theme-light))] mx-auto mb-2" /><p className="text-sm">{h}</p></div>))}</div></div></section>

      {/* Module 6: Haki Guide */}
      <section id="haki-guide" className="scroll-mt-24 px-4 py-20"><div className="container mx-auto max-w-5xl"><div className="text-center mb-12 scroll-reveal"><h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeLimitlessHakiGuide.title}</h2><p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeLimitlessHakiGuide.intro}</p></div><div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">{t.modules.animeLimitlessHakiGuide.regions.map((region: any, index: number) => (<div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"><div className="flex items-center gap-3 mb-3"><Shield className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" /><h3 className="font-bold">{region.name}</h3><span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{region.type}</span></div><p className="text-muted-foreground text-sm">{region.description}</p></div>))}</div></div></section>

      {/* Module 7: Bosses and Drops Guide */}
      <section id="bosses-drops-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]"><div className="container mx-auto max-w-5xl"><div className="text-center mb-12 scroll-reveal"><h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeLimitlessBossesAndDropsGuide.title}</h2><p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeLimitlessBossesAndDropsGuide.intro}</p></div><div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{t.modules.animeLimitlessBossesAndDropsGuide.creatures.map((c: any, index: number) => (<div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"><div className="mb-3"><span className="text-xs px-2 py-1 rounded-full border bg-[hsl(var(--nav-theme)/0.1)] border-[hsl(var(--nav-theme)/0.3)]">{c.role}</span></div><h3 className="font-bold mb-2">{c.name}</h3><p className="text-muted-foreground text-sm">{c.description}</p></div>))}</div></div></section>

      {/* Module 8: Trello and Discord Guide */}
      <section id="trello-discord-guide" className="scroll-mt-24 px-4 py-20"><div className="container mx-auto max-w-5xl"><div className="text-center mb-12 scroll-reveal"><h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeLimitlessTrelloAndDiscordGuide.title}</h2><p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeLimitlessTrelloAndDiscordGuide.intro}</p></div><div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">{t.modules.animeLimitlessTrelloAndDiscordGuide.items.map((item: any, index: number) => (<div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"><div className="flex items-center gap-2 mb-3"><Compass className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" /><span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{item.type}</span></div><h3 className="font-bold mb-2">{item.name}</h3><p className="text-muted-foreground text-sm">{item.description}</p></div>))}</div><div className="scroll-reveal flex flex-wrap gap-3 justify-center">{t.modules.animeLimitlessTrelloAndDiscordGuide.unlockMilestones.map((m: string, i: number) => (<span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm"><Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />{m}</span>))}</div></div></section>

      {mobileBannerAd && (
        <AdBanner type={mobileBannerAd.type} adKey={mobileBannerAd.adKey} className="md:hidden" />
      )}

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/ca8tz9zr4C"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://trello.com/b/UK3Ggwan/anime-limitless"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.roblox.com/communities/869813731/TAKLA-SQUAD-V-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.roblox.com/games/99383863544987/Anime-Limitless"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
