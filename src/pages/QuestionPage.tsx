import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ContinueCtaButton } from "../components/ContinueCtaButton";
import backArrow from "../assets/back-arrow.svg";
import healthAndGoLogo from "../assets/health-and-go-logo.svg";
import { useFlow } from "../flow/FlowContext";
import { QUESTIONS } from "../flow/questions";
import { useFlowNav } from "../flow/useFlowNav";
import type { FlowAnswers } from "../flow/types";
import shared from "./shared.module.css";

const HEALTH_AND_GO_LOGO = healthAndGoLogo;
const BACK_ARROW_SRC = backArrow;

export function QuestionPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const question = QUESTIONS.find((q) => q.id === questionId);
  const { answers, setAnswer } = useFlow();
  const { goNext, goBack } = useFlowNav();

  const saved = question ? answers[question.id] : undefined;
  const [local, setLocal] = useState<FlowAnswers[string] | undefined>(saved);
  const isConsentScroll = question?.type === "consent-scroll";
  const [consentReachedEnd, setConsentReachedEnd] = useState(
    () => Boolean(question?.type === "consent-scroll" && saved === true),
  );

  useEffect(() => {
    setLocal(saved);
  }, [question?.id, saved]);

  useEffect(() => {
    if (isConsentScroll) {
      setConsentReachedEnd(saved === true);
    }
  }, [isConsentScroll, question?.id, saved]);

  const updateConsentDocumentScroll = useCallback(() => {
    if (!question || question.type !== "consent-scroll") return;
    if (answers[question.id] === true) {
      setConsentReachedEnd(true);
      return;
    }
    const root = document.scrollingElement ?? document.documentElement;
    const scrollTop = root.scrollTop;
    const viewport = window.visualViewport?.height ?? window.innerHeight;
    const fullHeight = root.scrollHeight;
    const hasOverflow = fullHeight > viewport + 2;
    if (!hasOverflow) {
      setConsentReachedEnd(true);
      return;
    }
    const remaining = fullHeight - scrollTop - viewport;
    setConsentReachedEnd(remaining <= 32);
  }, [question, answers]);

  useEffect(() => {
    if (!isConsentScroll || !question) return;
    const run = () => updateConsentDocumentScroll();
    run();
    const raf = window.requestAnimationFrame(run);
    window.addEventListener("scroll", run, { passive: true });
    window.addEventListener("resize", run);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", run);
      window.removeEventListener("resize", run);
    };
  }, [isConsentScroll, question, question?.id, question?.bullets, updateConsentDocumentScroll]);

  const canContinue = useMemo(() => {
    if (!question) return false;
    if (question.type === "consent-scroll") {
      if (!question.required) return true;
      if (saved === true) return true;
      return consentReachedEnd;
    }
    if (!question.required) return true;
    if (question.type === "checkbox") return local === true;
    if (local === undefined || local === "" || (Array.isArray(local) && local.length === 0))
      return false;
    return true;
  }, [question, local, consentReachedEnd, saved]);

  if (!question) return <Navigate to="/" replace />;

  const commit = (value: FlowAnswers[string]) => {
    setLocal(value);
    setAnswer(question.id, value);
    if (question.type === "multi-choice" && Array.isArray(value) && value.length === 1 && value[0] === "none") {
      window.setTimeout(() => goNext({ ...answers, [question.id]: value }), 180);
    }
  };

  const handleContinue = () => {
    if (question.type === "consent-scroll") {
      const nextAnswers = { ...answers, [question.id]: true };
      setAnswer(question.id, true);
      goNext(nextAnswers);
      return;
    }
    const nextAnswers = local === undefined ? answers : { ...answers, [question.id]: local };
    if (local !== undefined) setAnswer(question.id, local);
    goNext(nextAnswers);
  };

  const handleAutoSelect = (value: FlowAnswers[string]) => {
    commit(value);
    if (typeof value === "string" && value === question.blockingOptionId) return;
    window.setTimeout(() => goNext({ ...answers, [question.id]: value }), 180);
  };

  const autoAdvance = ["yes-no", "single-choice", "cards"].includes(question.type);
  const selectedBlockingAnswer =
    typeof local === "string" && local === question.blockingOptionId;
  const selectedMultiChoiceAnswers = Array.isArray(local) ? local : [];
  const selectedWarningAnswer =
    question.warningOptionId ? selectedMultiChoiceAnswers.includes(question.warningOptionId) : false;
  const continueLabel =
    question.type === "multi-choice" && selectedMultiChoiceAnswers.length > 0 ?
      `NEXT (${selectedMultiChoiceAnswers.length})`
    : "NEXT";
  const showContinueButton =
    !autoAdvance && !(question.type === "multi-choice" && selectedMultiChoiceAnswers.length === 0);
  const showBackButton = question.id !== QUESTIONS[0].id;

  return (
    <div
      className={
        [shared.questionPage, isConsentScroll ? shared.questionPageConsent : ""]
          .filter(Boolean)
          .join(" ")
      }
    >
      <div className={shared.questionIntro}>
        {showBackButton && (
          <button type="button" className={shared.pageBackButton} onClick={goBack} aria-label="Go back">
            <img className={shared.pageBackIcon} src={BACK_ARROW_SRC} alt="" aria-hidden="true" />
          </button>
        )}

        <div className={shared.operatedBy}>
          <span>Operated by</span>
          <div className={shared.healthLogoFrame}>
            <img src={HEALTH_AND_GO_LOGO} alt="Health&go" />
          </div>
        </div>
      </div>

      <h1 className={shared.pageTitle}>{question.title}</h1>
      {question.subtitle && <p className={shared.pageSubtitle}>{question.subtitle}</p>}
      {!isConsentScroll && question.bullets && (
        <ul
          className={
            question.bulletVariant === "plain" ? shared.bulletListPlain : shared.bulletList
          }
        >
          {question.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {isConsentScroll && question.bullets && (
        <ul className={shared.consentBulletList}>
          {question.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      <QuestionInput
        question={question}
        value={local}
        onChange={autoAdvance ? handleAutoSelect : commit}
      />

      {selectedBlockingAnswer && question.blockingError && (
        <div
          className={
            question.blockingErrorVariant === "plain" ?
              shared.errorMessagePlain
            : shared.errorMessage
          }
          role="alert"
        >
          {question.blockingErrorVariant !== "plain" && <span aria-hidden="true">ⓘ</span>}
          <p>{question.blockingError}</p>
        </div>
      )}

      {!selectedBlockingAnswer && question.infoText && (
        <div className={shared.infoMessage}>
          <span aria-hidden="true">i</span>
          <p>{question.infoText}</p>
        </div>
      )}

      {selectedWarningAnswer && question.warningText && (
        <div className={shared.warningMessage} role="note">
          <p>{question.warningText}</p>
        </div>
      )}

      {showContinueButton &&
        (isConsentScroll ?
          <div className={shared.consentStickyFooter}>
            <ContinueCtaButton
              label={continueLabel}
              disabled={!canContinue}
              onClick={handleContinue}
              className={shared.consentContinueBtn}
            />
          </div>
        : <ContinueCtaButton
            label={continueLabel}
            disabled={!canContinue}
            onClick={handleContinue}
          />)}
    </div>
  );
}

function QuestionInput({
  question,
  value,
  onChange,
}: {
  question: (typeof QUESTIONS)[0];
  value: FlowAnswers[string] | undefined;
  onChange: (v: FlowAnswers[string]) => void;
}) {
  switch (question.type) {
    case "yes-no":
      return (
        <div className={shared.yesNoRow}>
          {(["Yes", "No"] as const).map((label, i) => (
            <button
              key={label}
              type="button"
              className={[
                shared.optionBtn,
                value === (i === 0 ? "yes" : "no") ? shared.optionBtnSelected : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onChange(i === 0 ? "yes" : "no")}
            >
              {label}
            </button>
          ))}
        </div>
      );

    case "single-choice":
    case "cards":
      return (
        <ul
          className={
            question.type === "cards" ? shared.cardGrid
            : question.optionLayout === "horizontal" ? shared.optionListHorizontal
            : shared.optionList
          }
        >
          {question.options?.map((opt) => (
            <li key={opt.id}>
              <button
                type="button"
                className={[
                  question.type === "cards" ? shared.cardOption : shared.optionBtn,
                  value === opt.id ?
                    question.type === "cards" ?
                      shared.cardOptionSelected
                    : shared.optionBtnSelected
                  : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onChange(opt.id)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      );

    case "multi-choice": {
      const selected = Array.isArray(value) ? value : [];
      const noneOption = question.options?.find((opt) => opt.id === "none");
      const otherOptions = question.options?.filter((opt) => opt.id !== "none") ?? [];
      const toggle = (id: string) => {
        if (id === "none") {
          onChange(selected.includes("none") ? [] : ["none"]);
          return;
        }
        const next = selected.includes(id) ?
          selected.filter((x) => x !== id)
        : [...selected.filter((x) => x !== "none"), id];
        onChange(next);
      };
      return (
        <div className={shared.multiChoiceGroup}>
          {noneOption && (
            <button
              type="button"
              className={[
                shared.multiChoiceNone,
                selected.includes(noneOption.id) ? shared.multiChoiceSelected : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => toggle(noneOption.id)}
            >
              {noneOption.label}
            </button>
          )}

          {noneOption && otherOptions.length > 0 && (
            <div className={shared.multiChoiceDivider} aria-hidden="true">
              <span />
              <strong>OR</strong>
              <span />
            </div>
          )}

          <ul className={shared.multiChoiceList}>
            {otherOptions.map((opt) => (
              <li key={opt.id}>
                <button
                  type="button"
                  className={[
                    shared.multiChoiceOption,
                    selected.includes(opt.id) ? shared.multiChoiceSelected : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => toggle(opt.id)}
                >
                  <span className={shared.multiChoiceCheckbox} aria-hidden="true" />
                  <span>{opt.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    case "info":
      return null;

    case "consent-scroll":
      return null;

    case "checkbox": {
      const checked = value === true;
      return (
        <button
          type="button"
          className={[shared.optionBtn, checked ? shared.optionBtnSelected : ""]
            .filter(Boolean)
            .join(" ")}
          onClick={() => onChange(!checked)}
        >
          {question.options?.[0]?.label ?? "Bestätigen"}
        </button>
      );
    }

    case "scale": {
      const min = question.min ?? 1;
      const max = question.max ?? 5;
      const nums = Array.from({ length: max - min + 1 }, (_, i) => min + i);
      return (
        <div className={shared.scaleRow}>
          {nums.map((n) => (
            <button
              key={n}
              type="button"
              className={[
                shared.scaleBtn,
                value === n ? shared.scaleBtnSelected : "",
              ]
                  .filter(Boolean)
                  .join(" ")}
              onClick={() => onChange(n)}
            >
              {n}
            </button>
          ))}
        </div>
      );
    }

    case "textarea":
      return (
        <textarea
          className={shared.textarea}
          placeholder={question.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "date":
      return (
        <input
          type="date"
          className={shared.input}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "number":
      return (
        <input
          type="number"
          className={shared.input}
          placeholder={question.placeholder}
          min={question.min}
          max={question.max}
          value={typeof value === "number" ? value : ""}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );

    case "text":
    default:
      return (
        <input
          type="text"
          className={shared.input}
          placeholder={question.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}
