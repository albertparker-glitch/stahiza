import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  Download,
  ExternalLink,
  Mail,
  Maximize2,
  Minimize2,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import {
  EmailSendResult,
  copyRichEmailToClipboard,
  downloadEmlFile,
  openGmailAndCopyStyledEmail,
  openMailAppAndCopyStyledEmail,
} from '../lib/emailService';
import { SchoolBadgeImg } from './SchoolBadgeImg';
import { SCHOOL_CONTACTS } from '../data/schoolData';

interface BrandedEmailReadyCardProps {
  emailResult: EmailSendResult;
  headline: string;
  subline: string;
  whatsappUrl?: string;
  resetLabel?: string;
  onReset?: () => void;
  onClose?: () => void;
  variant?: 'light' | 'dark' | 'modal';
}

export const BrandedEmailReadyCard: React.FC<BrandedEmailReadyCardProps> = ({
  emailResult,
  headline,
  subline,
  whatsappUrl,
  resetLabel = 'Submit Another',
  onReset,
  onClose,
  variant = 'light',
}) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'auto-copied' | 'manual-copied' | 'needs-click'>('idle');
  const [expandedPreview, setExpandedPreview] = useState(false);

  useEffect(() => {
    let active = true;
    emailResult.autoCopyPromise
      .then((ok) => {
        if (!active) return;
        setCopyStatus(ok ? 'auto-copied' : 'needs-click');
      })
      .catch(() => {
        if (!active) return;
        setCopyStatus('needs-click');
      });
    return () => {
      active = false;
    };
  }, [emailResult]);

  const handleCopyRichEmail = async () => {
    const ok = await copyRichEmailToClipboard(emailResult.htmlBody, emailResult.payloadSummary);
    if (ok) {
      setCopyStatus('manual-copied');
      setTimeout(() => {
        setCopyStatus((prev) => (prev === 'manual-copied' ? 'auto-copied' : prev));
      }, 2800);
    } else {
      setCopyStatus('needs-click');
    }
  };

  const handleOpenGmail = async () => {
    const ok = await openGmailAndCopyStyledEmail(emailResult);
    if (ok) {
      setCopyStatus('manual-copied');
      setTimeout(() => {
        setCopyStatus((prev) => (prev === 'manual-copied' ? 'auto-copied' : prev));
      }, 2800);
    }
  };

  const handleOpenMailApp = async () => {
    const ok = await openMailAppAndCopyStyledEmail(emailResult);
    if (ok) {
      setCopyStatus('manual-copied');
      setTimeout(() => {
        setCopyStatus((prev) => (prev === 'manual-copied' ? 'auto-copied' : prev));
      }, 2800);
    }
  };

  const handleDownloadEml = () => {
    downloadEmlFile(emailResult.emlContent, emailResult.emlFilename);
  };

  const isMobileDevice = emailResult.deviceType === 'mobile';
  const isDarkSurface = variant === 'dark';

  const containerClass = isDarkSurface
    ? 'space-y-5 text-left text-white'
    : 'space-y-5 text-left text-slate-900 dark:text-slate-100';

  const headerCardClass = isDarkSurface
    ? 'bg-[#0A192F] border border-slate-700/80 rounded-2xl p-5 space-y-4'
    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm';

  const mutedTextClass = isDarkSurface
    ? 'text-slate-300'
    : 'text-slate-600 dark:text-slate-300';

  const metaTextClass = isDarkSurface
    ? 'text-slate-400'
    : 'text-slate-500 dark:text-slate-400';

  const secondaryBtnClass = isDarkSurface
    ? 'px-3.5 py-2 rounded-xl border border-slate-600/80 bg-slate-800/80 hover:bg-slate-700 text-slate-100 text-xs font-semibold transition inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer'
    : 'px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold transition inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer';

  const previewHeightClass =
    variant === 'modal'
      ? expandedPreview
        ? 'h-[520px]'
        : 'h-[360px]'
      : expandedPreview
      ? 'h-[720px]'
      : 'h-[480px] sm:h-[540px]';

  return (
    <div className={containerClass}>
      {/* TOP CONFIRMATION & ACTION STUDIO */}
      <div className={headerCardClass}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="shrink-0">
              <SchoolBadgeImg size={44} className="w-11 h-11" />
            </div>
            <div className="space-y-1">
              <div className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-semibold uppercase tracking-wider ${metaTextClass}`}>
                <span className="text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Ready to Send
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{emailResult.refCode}</span>
                <span aria-hidden="true">·</span>
                <span>{emailResult.deviceType === 'pc' ? 'Desktop Gmail Web' : 'Mobile Mail App'}</span>
              </div>
              <h3 className={`text-lg sm:text-xl font-extrabold font-['Montserrat'] tracking-tight ${isDarkSurface ? 'text-white' : 'text-[#0A192F] dark:text-white'}`}>
                {headline}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${mutedTextClass}`}>
                {subline}
              </p>
            </div>
          </div>

          {(onReset || onClose) && (
            <div className="flex items-center gap-2 shrink-0">
              {onReset && (
                <button
                  type="button"
                  onClick={onReset}
                  className={secondaryBtnClass}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{resetLabel}</span>
                </button>
              )}
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className={secondaryBtnClass}
                >
                  <span>Close</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* AUTO-COPY GUIDANCE STRIP */}
        <div
          className={`rounded-xl px-4 py-3 text-xs leading-relaxed border ${
            copyStatus === 'manual-copied' || copyStatus === 'auto-copied'
              ? isDarkSurface
                ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : isDarkSurface
              ? 'bg-amber-950/40 border-amber-700/60 text-amber-200'
              : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
          }`}
        >
          {isMobileDevice ? (
            copyStatus === 'manual-copied' || copyStatus === 'auto-copied' ? (
              <span>
                <strong>Mobile detected — finished preview copied &amp; Mail App opened.</strong>{' '}
                Browsers do not allow websites to auto-paste inside external mail apps without Google OAuth, so tap inside the empty body and tap <strong>Paste</strong> — or tap{' '}
                <strong>Pre-Filled Draft (.eml)</strong> to open a draft already containing the full STAHIZA badge email.
              </span>
            ) : (
              <span>
                Tap <strong>Open Mail App &amp; Paste</strong> (copies the finished badge letter first), or tap{' '}
                <strong>Pre-Filled Draft (.eml)</strong> to open a draft already containing the full design.
              </span>
            )
          ) : copyStatus === 'manual-copied' ? (
            <span>
              <strong>Finished preview email copied with school badge!</strong> Click into the empty Gmail message box and press{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[11px] font-bold">Ctrl+V</kbd>{' '}
              (or <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[11px] font-bold">Cmd+V</kbd>) — or use{' '}
              <strong>Pre-Filled Draft (.eml)</strong> for a draft that already has the badge email inside.
            </span>
          ) : copyStatus === 'auto-copied' ? (
            <span>
              <strong>
                {emailResult.popupBlocked
                  ? 'PC detected — finished preview copied (click Open Gmail below if your browser blocked the tab).'
                  : 'PC detected — finished preview copied & Gmail Web opened.'}
              </strong>{' '}
              Browser security blocks websites from auto-pasting inside Gmail without OAuth, so press{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[11px] font-bold">Ctrl+V</kbd>{' '}
              (<kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[11px] font-bold">Cmd+V</kbd>) in the compose box, or click{' '}
              <strong>Pre-Filled Draft (.eml)</strong>.
            </span>
          ) : (
            <span>
              Click <strong>Open Gmail &amp; Paste Preview</strong> (copies the finished badge letter and opens Gmail) or{' '}
              <strong>Pre-Filled Draft (.eml)</strong> for a ready-to-send draft with no pasting needed.
            </span>
          )}
        </div>

        {/* ACTION TOOLBAR */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {isMobileDevice ? (
            <button
              type="button"
              onClick={handleOpenMailApp}
              className="px-4 py-2.5 rounded-xl bg-[#800020] hover:bg-[#660019] text-white text-xs font-bold shadow-sm transition inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              <span>Open Mail App &amp; Paste</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOpenGmail}
              className="px-4 py-2.5 rounded-xl bg-[#800020] hover:bg-[#660019] text-white text-xs font-bold shadow-sm transition inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              <span>Open Gmail &amp; Paste Preview</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDownloadEml}
            className="px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#13294B] text-amber-300 border border-slate-700 text-xs font-bold shadow-sm transition inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            title="Opens as a ready-to-send editable draft already filled with the STAHIZA school badge in Outlook, Apple Mail, Thunderbird, or Mail app"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Pre-Filled Draft (.eml)</span>
          </button>

          <button
            type="button"
            onClick={handleCopyRichEmail}
            className={secondaryBtnClass}
          >
            {copyStatus === 'manual-copied' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied Preview</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Preview Email</span>
              </>
            )}
          </button>

          {isMobileDevice ? (
            <button
              type="button"
              onClick={handleOpenGmail}
              className={secondaryBtnClass}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Gmail Web</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOpenMailApp}
              className={secondaryBtnClass}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Mail App</span>
            </button>
          )}

          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-slate-950 text-xs font-bold transition inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp ({SCHOOL_CONTACTS.phone1})</span>
            </a>
          )}
        </div>
      </div>

      {/* LIVE BRANDED EMAIL PREVIEW SHEET */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg bg-[#f4f6fa]">
        <div className="bg-[#0A192F] text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-400/30">
          <div className="min-w-0 space-y-0.5">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-amber-300 font-bold uppercase tracking-wider">
              <span>Live Finished Email Preview</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-300 normal-case font-semibold">
                {isMobileDevice
                  ? 'Copied & Mobile Mail Ready · .eml Included'
                  : 'Copied & Gmail Web Ready · .eml Included'}
              </span>
            </div>
            <p className="text-xs font-semibold text-white truncate">
              To: {emailResult.recipient} &nbsp;·&nbsp; Subject: {emailResult.subject}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {isMobileDevice ? (
              <button
                type="button"
                onClick={handleOpenMailApp}
                className="px-3 py-1.5 rounded-lg bg-[#800020] hover:bg-[#9b0d31] text-white text-[11px] font-bold transition inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer border border-amber-300/30"
              >
                <Mail className="w-3 h-3 text-amber-300" />
                <span>Send in Mail App</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleOpenGmail}
                className="px-3 py-1.5 rounded-lg bg-[#800020] hover:bg-[#9b0d31] text-white text-[11px] font-bold transition inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer border border-amber-300/30"
              >
                <ExternalLink className="w-3 h-3 text-amber-300" />
                <span>Send This in Gmail</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownloadEml}
              className="px-2.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#0A192F] text-[11px] font-bold transition inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>.eml File</span>
            </button>

            <button
              type="button"
              onClick={() => setExpandedPreview((prev) => !prev)}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-semibold transition inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {expandedPreview ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Compact</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Expand</span>
                </>
              )}
            </button>
          </div>
        </div>

        <iframe
          title="STAHIZA Official Branded Email Preview"
          srcDoc={emailResult.htmlBody}
          className={`w-full ${previewHeightClass} border-0 bg-[#f4f6fa] transition-all duration-200`}
        />
      </div>
    </div>
  );
};

export default BrandedEmailReadyCard;
