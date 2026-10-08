"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { motion, useReducedMotion } from "framer-motion";

import type { Combo, TrackGroup } from "@/lib/default-content";

import {
  InstrumentIcon,
  MailIcon,
  PhoneIcon,
} from "./icons";

type Props = {
  site: any;
  combos: Combo[];
  tracks: TrackGroup[];
  personnel: any;
  booking: any;
};

const ease = [0.22, 1, 0.36, 1] as const;

/* ============================================================
   GENERAL ANIMATIONS
   ============================================================ */

const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

/* ============================================================
   HERO OPENING
   ============================================================ */

/*
  The opening is intentionally cinematic:

  1. Dark overlay covers hero
  2. Small center glow appears
  3. Overlay expands outward
  4. Hero content rises out of the darkness
  5. Navigation settles
  6. Scroll cue starts moving

  No layout or design changes.
*/

/* Main dark opening */

const heroOverlay = {
  hidden: {
    opacity: 1,
  },

  visible: {
    opacity: 0,
    transition: {
      duration: 1.25,
      delay: 0.2,
      ease,
    },
  },
};

/* Gold center light */

const heroGlow = {
  hidden: {
    opacity: 0,
    scale: 0.25,
  },

  visible: {
    opacity: [0, 0.8, 0],
    scale: [0.25, 1.15, 1.8],
    transition: {
      duration: 1.5,
      delay: 0.15,
      ease,
      times: [0, 0.35, 1],
    },
  },
};

/* Small line that expands across the screen */

const heroLine = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },

  visible: {
    scaleX: 1,
    opacity: [0, 1, 0],
    transition: {
      duration: 1.25,
      delay: 0.35,
      ease,
      times: [0, 0.35, 1],
    },
  },
};

/* Eyebrow */

const heroEyebrow = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay: 0.72,
      ease,
    },
  },
};

/* Main title */

const heroTitle = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.97,
    filter: "blur(12px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.15,
      delay: 0.78,
      ease,
    },
  },
};

/* Subtitle */

const heroSubtitle = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(7px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      delay: 1.05,
      ease,
    },
  },
};

/* Scroll cue */

const heroCue = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 1.65,
      ease,
    },
  },
};

/* Navigation */

const navOpening = {
  hidden: {
    opacity: 0,
    y: -18,
    filter: "blur(7px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay: 0.45,
      ease,
    },
  },
};

export default function JazzSite({
  site,
  combos,
  tracks,
  personnel,
  booking,
}: Props) {
  const reduce = useReducedMotion();

  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState<{
    title: string;
    style: string;
    file: string;
  } | null>(null);

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const [status, setStatus] = useState(
    "Opens your email app with the details filled in."
  );

  const [lastMessage, setLastMessage] = useState("");
  const [active, setActive] = useState("home");

  /* ============================================================
     ACTIVE SECTION
     ============================================================ */

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    );

    const spy = () => {
      const pos =
        window.scrollY +
        window.innerHeight * 0.35;

      let id = "home";

      for (const sec of sections) {
        if (sec.offsetTop <= pos) {
          id = sec.id;
        }
      }

      setActive(id);
    };

    window.addEventListener(
      "scroll",
      spy,
      { passive: true }
    );

    spy();

    return () =>
      window.removeEventListener(
        "scroll",
        spy
      );
  }, []);

  /* ============================================================
     AUDIO
     ============================================================ */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const onTime = () =>
      setTime(audio.currentTime);

    const onMeta = () =>
      setDuration(audio.duration || 0);

    const onPlay = () =>
      setPlaying(true);

    const onPause = () =>
      setPlaying(false);

    const onEnded = () => {
      setPlaying(false);
      audio.currentTime = 0;
      setTime(0);
      setPulse(true);

      window.setTimeout(
        () => setPulse(false),
        900
      );
    };

    audio.addEventListener(
      "timeupdate",
      onTime
    );

    audio.addEventListener(
      "loadedmetadata",
      onMeta
    );

    audio.addEventListener(
      "play",
      onPlay
    );

    audio.addEventListener(
      "pause",
      onPause
    );

    audio.addEventListener(
      "ended",
      onEnded
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        onTime
      );

      audio.removeEventListener(
        "loadedmetadata",
        onMeta
      );

      audio.removeEventListener(
        "play",
        onPlay
      );

      audio.removeEventListener(
        "pause",
        onPause
      );

      audio.removeEventListener(
        "ended",
        onEnded
      );
    };
  }, []);

  const fmt = (s: number) =>
    Number.isFinite(s)
      ? `${Math.floor(s / 60)}:${Math.floor(
          s % 60
        )
          .toString()
          .padStart(2, "0")}`
      : "0:00";

  const wave = useMemo(
    () =>
      Array.from(
        { length: 52 },
        (_, i) =>
          18 +
          Math.round(
            Math.abs(
              Math.sin(i * 0.55)
            ) *
              34 +
              ((i * 17) % 22)
          )
      ),
    []
  );

  const selectSong = async (
    song: {
      title: string;
      file: string;
    },
    style: string
  ) => {
    const audio = audioRef.current;

    if (!audio) return;

    if (
      current?.file ===
      song.file
    ) {
      if (audio.paused) {
        await audio
          .play()
          .catch(() => {});
      } else {
        audio.pause();
      }

      return;
    }

    setCurrent({
      ...song,
      style,
    });

    setTime(0);
    setDuration(0);

    audio.src = song.file;

    await audio
      .play()
      .catch(() => {});
  };

  const stop = () => {
    const audio =
      audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setTime(0);
  };

  /* ============================================================
     COPY
     ============================================================ */

  const copy = async (
    value: string
  ) => {
    try {
      await navigator.clipboard.writeText(
        value
      );
    } catch {
      /* noop */
    }

    setCopied(value);

    window.setTimeout(
      () => setCopied(null),
      1600
    );
  };

  /* ============================================================
     BOOKING FORM
     ============================================================ */

  const submit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form =
      e.currentTarget;

    const data =
      new FormData(form);

    const value = (
      name: string
    ) =>
      String(
        data.get(name) || ""
      ).trim();

    const message = [
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Event date: ${
        value("date") || "-"
      }`,
      `Band size: ${
        value("band") ||
        "Not sure yet"
      }`,
      "",
      value("message") ||
        "(no extra details)",
    ].join("\r\n");

    setLastMessage(message);

    const subject =
      `Jazz Du Jour booking request - ${value(
        "name"
      )}`;

    window.location.href =
      `mailto:${booking.email}` +
      `?subject=${encodeURIComponent(
        subject
      )}` +
      `&body=${encodeURIComponent(
        message
      )}`;

    setStatus(
      "Your email app should open with the details filled in. Just press send."
    );
  };

  /* ============================================================
     NAV
     ============================================================ */

  const nav = [
    {
      id: "home",
      label: "Home",
      className: "nav-home",
    },
    {
      id: "samples",
      label: "Samples",
    },
    {
      id: "booking",
      label: "Book the Band",
      cta: true,
    },
  ];

  return (
    <>
      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <motion.header
        className="nav"
        variants={navOpening}
        initial={
          reduce
            ? false
            : "hidden"
        }
        animate={
          reduce
            ? {}
            : "visible"
        }
      >
        <motion.a
          className="brand"
          href="#home"
          whileHover={
            reduce
              ? {}
              : {
                  scale: 1.02,
                }
          }
        >
          <span className="brand-note">
            ♪
          </span>{" "}
          JAZZ <em>DU</em> JOUR
        </motion.a>

        <nav>
          {nav.map((n) => (
            <motion.a
              key={n.id}
              href={`#${n.id}`}
              className={`${
                active === n.id
                  ? "active "
                  : ""
              }${
                n.className || ""
              }${
                n.cta
                  ? " nav-cta"
                  : ""
              }`}
              whileHover={
                reduce
                  ? {}
                  : {
                      y: -2,
                    }
              }
              whileTap={
                reduce
                  ? {}
                  : {
                      scale: 0.97,
                    }
              }
            >
              <span
                className={
                  n.id ===
                    "samples" ||
                  n.cta
                    ? "long"
                    : ""
                }
              >
                {n.id ===
                "samples"
                  ? "Music "
                  : n.cta
                  ? "Book "
                  : ""}
              </span>

              {n.cta
                ? "the Band"
                : n.label}
            </motion.a>
          ))}
        </nav>
      </motion.header>

      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        id="home"
        className="hero"
        style={{
          position:
            "relative",
          overflow: "hidden",
        }}
      >
        {/* ====================================================
            CINEMATIC OPENING
        ==================================================== */}

        {!reduce && (
          <>
            {/* Dark screen */}

            <motion.div
              variants={
                heroOverlay
              }
              initial="hidden"
              animate="visible"
              aria-hidden="true"
              style={{
                position:
                  "absolute",
                inset: 0,
                zIndex: 20,
                pointerEvents:
                  "none",
                background:
                  "var(--bg)",
              }}
            />

            {/* Center gold glow */}

            <motion.div
              variants={
                heroGlow
              }
              initial="hidden"
              animate="visible"
              aria-hidden="true"
              style={{
                position:
                  "absolute",
                left: "50%",
                top: "50%",
                width: "55vw",
                height: "55vw",
                maxWidth:
                  "800px",
                maxHeight:
                  "800px",
                transform:
                  "translate(-50%, -50%)",
                borderRadius:
                  "50%",
                background:
                  "radial-gradient(circle, rgba(210,165,75,0.30) 0%, rgba(210,165,75,0.10) 28%, transparent 70%)",
                filter:
                  "blur(18px)",
                zIndex: 21,
                pointerEvents:
                  "none",
              }}
            />

            {/* Horizontal light sweep */}

            <motion.div
              variants={
                heroLine
              }
              initial="hidden"
              animate="visible"
              aria-hidden="true"
              style={{
                position:
                  "absolute",
                left: "10%",
                right: "10%",
                top: "50%",
                height: "1px",
                transformOrigin:
                  "center",
                background:
                  "linear-gradient(90deg, transparent, rgba(220,180,95,0.8), transparent)",
                boxShadow:
                  "0 0 22px rgba(220,180,95,0.35)",
                zIndex: 22,
                pointerEvents:
                  "none",
              }}
            />

            {/* Soft dark vignette */}

            <motion.div
              aria-hidden="true"
              initial={{
                opacity: 0.85,
              }}
              animate={{
                opacity: 0,
              }}
              transition={{
                duration: 1.5,
                delay: 0.3,
                ease,
              }}
              style={{
                position:
                  "absolute",
                inset: 0,
                zIndex: 19,
                pointerEvents:
                  "none",
                background:
                  "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.20) 55%, rgba(0,0,0,0.70) 100%)",
              }}
            />
          </>
        )}

        {/* ====================================================
            HERO CONTENT
        ==================================================== */}

        <div
          className="hero-inner"
          style={{
            position:
              "relative",
            zIndex: 5,
          }}
        >
          {/* Eyebrow */}

          <motion.p
            className="eyebrow"
            variants={heroEyebrow}
            initial={
              reduce
                ? false
                : "hidden"
            }
            animate={
              reduce
                ? {}
                : "visible"
            }
          >
            {site.eyebrow}
          </motion.p>

          {/* Main title */}

          <motion.h1
            variants={heroTitle}
            initial={
              reduce
                ? false
                : "hidden"
            }
            animate={
              reduce
                ? {}
                : "visible"
            }
          >
            {site.heroTitle}{" "}
            <span>
              {site.heroAccent}
            </span>{" "}
            JOUR
          </motion.h1>

          {/* Subtitle */}

          <motion.p
            className="hero-sub"
            variants={
              heroSubtitle
            }
            initial={
              reduce
                ? false
                : "hidden"
            }
            animate={
              reduce
                ? {}
                : "visible"
            }
          >
            {site.heroSubtitle}
          </motion.p>
        </div>

        {/* ====================================================
            SCROLL CUE
        ==================================================== */}

        <motion.a
          className="scroll-cue"
          href="#combos"
          aria-label="Scroll down"
          variants={heroCue}
          initial={
            reduce
              ? false
              : "hidden"
          }
          animate={
            reduce
              ? {}
              : "visible"
          }
          style={{
            zIndex: 6,
          }}
        >
          <motion.span
            style={{
              display:
                "inline-block",
            }}
            animate={
              reduce
                ? {}
                : {
                    y: [
                      0,
                      7,
                      0,
                    ],
                    opacity: [
                      0.45,
                      1,
                      0.45,
                    ],
                  }
            }
            transition={{
              duration: 2.2,
              repeat:
                Infinity,
              ease: "easeInOut",
            }}
          >
            ⌄
          </motion.span>
        </motion.a>
      </section>

      {/* ======================================================
          COMBOS
      ====================================================== */}

      <section
        className="combos"
        id="combos"
      >
        <div className="combos-intro">
          <div>
            <motion.h2
              className="section-title"
              variants={
                sectionReveal
              }
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.45,
              }}
            >
              The Combos
            </motion.h2>

            <motion.p
              className="section-lede"
              initial={
                reduce
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              whileInView={
                reduce
                  ? {}
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
                amount: 0.45,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease,
              }}
            >
              {site.combosLead}
            </motion.p>
          </div>

          <motion.p
            className="real-jazz"
            initial={
              reduce
                ? false
                : {
                    opacity: 0,
                    x: 25,
                  }
            }
            whileInView={
              reduce
                ? {}
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
          >
            {site.realJazz
              .split("real jazz")
              .map(
                (
                  x: string,
                  i: number,
                  arr: string[]
                ) => (
                  <span key={i}>
                    {x}

                    {i <
                      arr.length -
                        1 && (
                      <strong>
                        “real jazz,”
                      </strong>
                    )}
                  </span>
                )
              )}
          </motion.p>
        </div>

        <div className="combo-grid">
          {combos.map(
            (
              combo,
              i
            ) => (
              <motion.article
                key={
                  combo._id ||
                  combo.title
                }
                className="combo-card"
                initial={
                  reduce
                    ? false
                    : {
                        opacity: 0,
                        y: 45,
                        scale: 0.97,
                      }
                }
                whileInView={
                  reduce
                    ? {}
                    : {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }
                }
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.8,
                  delay:
                    i * 0.1,
                  ease,
                }}
                whileHover={
                  reduce
                    ? {}
                    : {
                        y: -8,
                        transition: {
                          duration: 0.3,
                          ease,
                        },
                      }
                }
              >
                <h3>
                  {combo.title}
                </h3>

                <p className="combo-sub">
                  {
                    combo.subtitle
                  }
                </p>

                <div className="insts">
                  {combo.instruments.map(
                    (
                      inst,
                      j
                    ) => (
                      <motion.div
                        className={`inst ${
                          inst.lead
                            ? "lead"
                            : ""
                        } ${
                          inst.ghost
                            ? "ghost"
                            : ""
                        }`}
                        key={`${inst.label}-${j}`}
                        initial={
                          reduce
                            ? false
                            : {
                                opacity: 0,
                                scale: 0.8,
                                y: 15,
                              }
                        }
                        whileInView={
                          reduce
                            ? {}
                            : {
                                opacity: 1,
                                scale: 1,
                                y: 0,
                              }
                        }
                        viewport={{
                          once: true,
                          amount: 0.5,
                        }}
                        transition={{
                          duration: 0.5,
                          delay:
                            i *
                              0.1 +
                            j *
                              0.06,
                          ease,
                        }}
                      >
                        {inst.alternateLabel ? (
                          <>
                            <span className="pair">
                              <span className="ico">
                                <InstrumentIcon
                                  type={
                                    inst.icon
                                  }
                                />
                              </span>

                              <span className="or">
                                or
                              </span>

                              <span className="ico">
                                <InstrumentIcon
                                  type={
                                    inst.alternateLabel
                                  }
                                />
                              </span>
                            </span>

                            <span className="inst-label">
                              {
                                inst.label
                              }
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="ico">
                              <InstrumentIcon
                                type={
                                  inst.icon
                                }
                              />
                            </span>

                            <span className="inst-label">
                              {
                                inst.label
                              }
                            </span>
                          </>
                        )}
                      </motion.div>
                    )
                  )}
                </div>
              </motion.article>
            )
          )}
        </div>

        <motion.a
          className="btn-gold"
          href="#samples"
          whileHover={
            reduce
              ? {}
              : {
                  y: -3,
                  scale: 1.02,
                }
          }
          whileTap={
            reduce
              ? {}
              : {
                  scale: 0.97,
                }
          }
          transition={{
            duration: 0.25,
            ease,
          }}
        >
          Listen to Samples ▶
        </motion.a>
      </section>

      {/* ======================================================
          SAMPLES
      ====================================================== */}

      <section
        className="samples"
        id="samples"
      >
        <motion.h2
          className="section-title"
          initial={
            reduce
              ? false
              : {
                  opacity: 0,
                  y: 30,
                }
          }
          whileInView={
            reduce
              ? {}
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
        >
          <span className="title-note">
            ♪
          </span>

          {site.samplesTitle}
        </motion.h2>

        <motion.p
          className="section-lede"
          initial={
            reduce
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={
            reduce
              ? {}
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease,
          }}
        >
          {site.samplesLead}
        </motion.p>

        <div className="samples-layout">
          <div className="style-list">
            {tracks.map(
              (
                group,
                groupIndex
              ) => (
                <motion.div
                  className="style-cat"
                  key={
                    group._id ||
                    group.style
                  }
                  initial={
                    reduce
                      ? false
                      : {
                          opacity: 0,
                          x: -25,
                        }
                  }
                  whileInView={
                    reduce
                      ? {}
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.7,
                    delay:
                      groupIndex *
                      0.08,
                    ease,
                  }}
                >
                  <h3>
                    {group.style}
                  </h3>

                  <ul>
                    {group.songs.map(
                      (song) => {
                        const isCurrent =
                          current?.file ===
                          song.file;

                        return (
                          <li
                            key={
                              song.file
                            }
                          >
                            <motion.button
                              className={`song ${
                                isCurrent
                                  ? "playing"
                                  : ""
                              } ${
                                isCurrent &&
                                playing
                                  ? "live"
                                  : ""
                              }`}
                              onClick={() =>
                                selectSong(
                                  song,
                                  group.style
                                )
                              }
                              aria-label={`Play ${song.title}`}
                              whileHover={
                                reduce
                                  ? {}
                                  : {
                                      x: 5,
                                    }
                              }
                              whileTap={
                                reduce
                                  ? {}
                                  : {
                                      scale: 0.99,
                                    }
                              }
                            >
                              <span className="song-icon">
                                <svg
                                  className="i-play"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>

                                <span
                                  className="eq"
                                  aria-hidden="true"
                                >
                                  <i />
                                  <i />
                                  <i />
                                </span>
                              </span>

                              <span className="song-title">
                                {
                                  song.title
                                }
                              </span>

                              <span
                                className="song-note"
                                aria-hidden="true"
                              >
                                ♫
                              </span>
                            </motion.button>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </motion.div>
              )
            )}
          </div>

          <aside className="samples-side">
            {/* PLAYER */}

            <motion.div
              ref={
                playerRef
              }
              className={`player ${
                pulse
                  ? "pulse"
                  : ""
              }`}
              initial={
                reduce
                  ? false
                  : {
                      opacity: 0,
                      y: 30,
                    }
              }
              whileInView={
                reduce
                  ? {}
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
                amount: 0.25,
              }}
              animate={
                reduce
                  ? {}
                  : {
                      scale:
                        playing
                          ? 1.01
                          : 1,
                    }
              }
              transition={{
                duration: 0.8,
                ease,
              }}
            >
              <p className="now-label">
                NOW PLAYING
              </p>

              <motion.p
                className="now-title"
                key={
                  current?.title ||
                  "empty"
                }
                initial={
                  reduce
                    ? false
                    : {
                        opacity: 0,
                        y: 8,
                      }
                }
                animate={
                  reduce
                    ? {}
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{
                  duration: 0.4,
                  ease,
                }}
              >
                {current?.title ||
                  "Select a sample"}
              </motion.p>

              <p className="now-style">
                {current?.style ||
                  "\u00a0"}
              </p>

              <div className="wave">
                {wave.map(
                  (
                    h,
                    i
                  ) => (
                    <motion.span
                      key={i}
                      style={{
                        height: `${h}%`,
                      }}
                      animate={
                        playing &&
                        !reduce
                          ? {
                              height: [
                                `${h}%`,
                                `${Math.max(
                                  8,
                                  (h *
                                    1.35) %
                                    75
                                )}%`,
                                `${h}%`,
                              ],
                            }
                          : {
                              height: `${h}%`,
                            }
                      }
                      transition={{
                        duration: 0.9,
                        repeat:
                          Infinity,
                        delay:
                          i *
                          0.012,
                        ease: "easeInOut",
                      }}
                    />
                  )
                )}
              </div>

              <div className="progress">
                <motion.div
                  className="progress-fill"
                  animate={{
                    width: duration
                      ? `${
                          (time /
                            duration) *
                          100
                        }%`
                      : "0%",
                  }}
                  transition={{
                    duration: 0.15,
                    ease: "linear",
                  }}
                />
              </div>

              <div className="times">
                <span>
                  {fmt(time)}
                </span>

                <span>
                  {fmt(duration)}
                </span>
              </div>

              <div className="player-controls">
                <motion.button
                  className="btn-play"
                  onClick={() => {
                    const a =
                      audioRef.current;

                    if (!a?.src)
                      return;

                    if (a.paused)
                      a
                        .play()
                        .catch(
                          () => {}
                        );
                    else
                      a.pause();
                  }}
                  aria-label={
                    playing
                      ? "Pause"
                      : "Play"
                  }
                  whileHover={
                    reduce
                      ? {}
                      : {
                          scale: 1.08,
                        }
                  }
                  whileTap={
                    reduce
                      ? {}
                      : {
                          scale: 0.94,
                        }
                  }
                >
                  {playing
                    ? "‖"
                    : "▶"}
                </motion.button>

                <motion.button
                  className="btn-ghost"
                  onClick={stop}
                  whileHover={
                    reduce
                      ? {}
                      : {
                          y: -2,
                        }
                  }
                  whileTap={
                    reduce
                      ? {}
                      : {
                          scale: 0.97,
                        }
                  }
                >
                  ■ Stop
                </motion.button>
              </div>

              <audio
                ref={
                  audioRef
                }
                preload="none"
              />
            </motion.div>

            {/* PERSONNEL */}

            <motion.div
              className="personnel"
              initial={
                reduce
                  ? false
                  : {
                      opacity: 0,
                      y: 35,
                    }
              }
              whileInView={
                reduce
                  ? {}
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease,
              }}
            >
              <div className="personnel-head">
                <motion.img
                  src={
                    personnel.photoUrl ||
                    personnel.photo ||
                    "/images/image (2).png"
                  }
                  alt="Michael Motley playing tenor saxophone"
                  width={300}
                  height={400}
                  loading="lazy"
                  initial={
                    reduce
                      ? false
                      : {
                          opacity: 0,
                          scale: 1.08,
                        }
                  }
                  whileInView={
                    reduce
                      ? {}
                      : {
                          opacity: 1,
                          scale: 1,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 1.1,
                    ease,
                  }}
                />

                <div className="personnel-intro">
                  <h3>
                    {
                      personnel.title
                    }
                  </h3>

                  <p className="personnel-sub">
                    {
                      personnel.subtitle
                    }
                  </p>
                </div>
              </div>

              <dl>
                {[
                  [
                    "Sax",
                    personnel.sax,
                  ],
                  [
                    "Piano",
                    personnel.piano,
                  ],
                  [
                    "Bass",
                    personnel.bass,
                  ],
                  [
                    "Drums",
                    personnel.drums,
                  ],
                  [
                    "Guitar",
                    personnel.guitar,
                  ],
                ].map(
                  ([k, v]) => (
                    <div
                      key={k}
                    >
                      <dt>
                        {k}
                      </dt>

                      <dd>
                        {v}
                      </dd>
                    </div>
                  )
                )}
              </dl>

              <p className="personnel-note">
                {
                  personnel.note
                }
              </p>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* ======================================================
          BOOKING
      ====================================================== */}

      <section
        className="booking"
        id="booking"
      >
        <div className="booking-wrap">
          <div className="booking-text">
            <motion.h2
              className="section-title"
              initial={
                reduce
                  ? false
                  : {
                      opacity: 0,
                      x: -30,
                    }
              }
              whileInView={
                reduce
                  ? {}
                  : {
                      opacity: 1,
                      x: 0,
                    }
              }
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.8,
                ease,
              }}
            >
              {
                site.bookingTitle
              }
            </motion.h2>

            <motion.p
              className="section-lede"
              initial={
                reduce
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              whileInView={
                reduce
                  ? {}
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease,
              }}
            >
              {
                site.bookingLead
              }
            </motion.p>

            <motion.ul
              className="contact-list"
              initial={
                reduce
                  ? false
                  : {
                      opacity: 0,
                      y: 25,
                    }
              }
              whileInView={
                reduce
                  ? {}
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease,
              }}
            >
              <li>
                <PhoneIcon />

                <a
                  className="contact-main"
                  href={`tel:+1${String(
                    booking.phone
                  ).replace(
                    /\D/g,
                    ""
                  )}`}
                >
                  <span className="contact-label">
                    Call or text
                  </span>

                  <span className="contact-value">
                    {
                      booking.phone
                    }
                  </span>
                </a>

                <button
                  type="button"
                  className={`btn-copy ${
                    copied ===
                    booking.phone
                      ? "done"
                      : ""
                  }`}
                  onClick={() =>
                    copy(
                      booking.phone
                    )
                  }
                >
                  {copied ===
                  booking.phone
                    ? "Copied ✓"
                    : "Copy"}
                </button>
              </li>

              <li>
                <MailIcon />

                <a
                  className="contact-main"
                  href={`mailto:${booking.email}?subject=Jazz%20Du%20Jour%20Booking`}
                >
                  <span className="contact-label">
                    Email
                  </span>

                  <span className="contact-value">
                    {
                      booking.email
                    }
                  </span>
                </a>

                <button
                  type="button"
                  className={`btn-copy ${
                    copied ===
                    booking.email
                      ? "done"
                      : ""
                  }`}
                  onClick={() =>
                    copy(
                      booking.email
                    )
                  }
                >
                  {copied ===
                  booking.email
                    ? "Copied ✓"
                    : "Copy"}
                </button>
              </li>
            </motion.ul>
          </div>

          <motion.form
            className="booking-form"
            onSubmit={submit}
            autoComplete="on"
            initial={
              reduce
                ? false
                : {
                    opacity: 0,
                    x: 35,
                  }
            }
            whileInView={
              reduce
                ? {}
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.9,
              ease,
            }}
          >
            <p className="form-title">
              {booking.intro}
            </p>

            <div className="field-row">
              <label>
                Name

                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                />
              </label>

              <label>
                Email

                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                />
              </label>
            </div>

            <div className="field-row">
              <label>
                Event date{" "}
                <span className="opt">
                  (if known)
                </span>

                <input
                  type="date"
                  name="date"
                />
              </label>

              <label>
                Band size

                <select name="band">
                  {(
                    booking.bandOptions ||
                    []
                  ).map(
                    (
                      x: string
                    ) => (
                      <option
                        key={x}
                      >
                        {x}
                      </option>
                    )
                  )}
                </select>
              </label>
            </div>

            <label>
              Tell us about the event

              <textarea
                name="message"
                rows={3}
                placeholder="Type of event, place, start time…"
              />
            </label>

            <motion.button
              type="submit"
              className="btn-gold btn-submit"
              whileHover={
                reduce
                  ? {}
                  : {
                      y: -3,
                      scale: 1.02,
                    }
              }
              whileTap={
                reduce
                  ? {}
                  : {
                      scale: 0.97,
                    }
              }
            >
              Send request
            </motion.button>

            <p
              className="form-note ok"
              role="status"
              aria-live="polite"
            >
              {status}
            </p>

            <button
              type="button"
              className="btn-link"
              hidden={!lastMessage}
              onClick={() =>
                copy(
                  `To: ${booking.email}\r\n\r\n${lastMessage}`
                )
              }
            >
              Email app didn’t open?
              Copy the message
            </button>
          </motion.form>
        </div>
      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <motion.footer
        initial={
          reduce
            ? false
            : {
                opacity: 0,
              }
        }
        whileInView={
          reduce
            ? {}
            : {
                opacity: 1,
              }
        }
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1,
          ease,
        }}
      >
        <p>
          <span className="brand-note">
            ♪
          </span>{" "}
          JAZZ <em>DU</em> JOUR
        </p>

        <p className="fine">
          ©{" "}
          {new Date().getFullYear()}{" "}
          {site.footerText}
        </p>
      </motion.footer>
    </>
  );
}