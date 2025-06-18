"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import willImg from "@/assets/will.jpg";
import draeImg from "@/assets/drae.jpg";
import darenImg from "@/assets/daren.jpg";
import { Card } from "@/components/ui/card";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";

const aboutStats = [
  {
    label: "Company Name",
    value: "Nestling LMS",
    color: "bg-pink-100",
  },
  {
    label: "Modules",
    value: (
      <ul className="space-y-1 text-base text-left list-disc list-inside">
        <li>Security Module</li>
        <li>Registration Module</li>
        <li>Validation Module</li>
        <li>Search Module</li>
        <li>Course Management Module</li>
        <li>Project Management Tracker Module</li>
        <li>Submission Module</li>
        <li>Inbox Module</li>
        <li>Data Analytics Module</li>
        <li>About Module</li>
        <li>Help Module</li>
      </ul>
    ),
    color: "bg-pink-200",
  },
  {
    label: "Support Hours",
    value: "Monday - Friday, 9:00 AM - 5:00 PM",
    color: "bg-pink-50",
  },
  {
    label: "Contact Email",
    value: "support@nestlingLMS.com",
    color: "bg-pink-50",
  },
  {
    label: "Contact Number",
    value: "(+63) 993-277-5503",
    color: "bg-indigo-50",
  },
];

const missionVision = [
  {
    title: "Mission",
    value: (
      <span>
        To empower educational initiatives with a dedicated platform that
        enhances productivity, collaboration, and efficiency across diverse
        learning projects.
      </span>
    ),
  },
  {
    title: "Vision",
    value: (
      <span>
        To create a collaborative and secure online space that enhances the
        learning journey for educators and employees, with tools tailored to
        meet modern educational needs.
      </span>
    ),
  },
];

const AboutStatBox = ({
  label,
  value,
  color,
}: {
  label: string;
  value: React.ReactNode;
  color: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className={`relative w-full min-w-[260px] max-w-[320px] h-[120px] rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer bg-background`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ zIndex: hovered ? 40 : 1 }}
    >
      <span className="mb-2 font-semibold text-foreground text-lg text-center">
        {label}
      </span>
      <div
        className={`absolute left-1/2 top-full w-full -translate-x-1/2 mt-2 bg-background rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden ${
          hovered
            ? "opacity-100 pointer-events-auto scale-100 max-h-[500px] animate-slideDown"
            : "opacity-0 pointer-events-none scale-95 max-h-0"
        }`}
        style={{ minWidth: 220, zIndex: 50, maxWidth: 320 }}
      >
        <span className="block w-full font-normal text-foreground text-center break-words">
          {value}
        </span>
      </div>
    </Card>
  );
};

const About = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <FadeInWrapper>
      <div className="flex flex-col items-center space-y-12 px-2 py-10 w-full">
        <h1 className="mb-2 font-bold text-foreground text-5xl text-center tracking-tight">
          About <span className="text-primary">Nestling</span>
        </h1>
        <h2 className="mb-4 font-semibold text-foreground text-2xl text-center">
          All-in-one Learning Management System
        </h2>
        <p className="mb-10 max-w-2xl text-muted-foreground text-lg text-center">
          An all-in-one Learning Management System designed to streamline
          educational operations within Leave a Nest, particularly for the
          Philippine branch. It offers a range of tools for course management,
          project tracking, secure communication, and analytics.
        </p>
        <div className="flex flex-row justify-center gap-8 mx-auto mb-8 w-full max-w-4xl">
          {aboutStats.slice(0, 3).map((stat, i) => (
            <AboutStatBox
              key={i}
              label={stat.label}
              value={stat.value}
              color={stat.color}
            />
          ))}
        </div>
        <div className="flex flex-row justify-center gap-8 mx-auto mb-4 w-full max-w-2xl">
          {aboutStats.slice(3).map((stat, i) => (
            <AboutStatBox
              key={i + 3}
              label={stat.label}
              value={stat.value}
              color={stat.color}
            />
          ))}
        </div>
        <Card className="flex flex-col items-center p-8 rounded-2xl w-full max-w-3xl">
          <div className="flex md:flex-row flex-col justify-center items-center gap-8 mx-auto mb-2 w-full max-w-3xl">
            {missionVision.map((item, i) => (
              <div
                key={i}
                className="flex flex-col flex-1 items-center text-center"
              >
                <h3 className="mb-2 font-bold text-primary text-xl">
                  {item.title}
                </h3>
                <p className="max-w-xs text-muted-foreground text-base">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="flex md:flex-row flex-col justify-between items-center gap-8 bg-white p-8 border rounded-2xl w-full max-w-4xl">
          <div className="flex flex-col flex-1 items-center md:items-start gap-2 min-w-[220px]">
            <h3 className="mb-1 font-bold text-primary text-xl">
              Leave a Nest Philippines, Inc.
            </h3>
            <p className="font-semibold text-foreground text-base">
              Office Address:
            </p>
            <p className="mb-2 text-muted-foreground text-base md:text-left text-center">
              Unit 2103, Orient Square Bldg., F. Ortigas Jr. Rd.,
              <br />
              Ortigas Center, Pasig City 1600
            </p>
            <p className="font-semibold text-foreground text-base">
              Operations Location:
            </p>
            <p className="text-muted-foreground text-base md:text-left text-center">
              Philippines
            </p>
          </div>
          <div className="flex flex-1 justify-center items-center min-w-[220px]">
            <iframe
              title="Nestling Office Map"
              src="https://www.google.com/maps?q=Unit+2103,+Orient+Square+Bldg.,+F.+Ortigas+Jr.+Rd.,+Ortigas+Center,+Pasig+City+1600&output=embed"
              width="320"
              height="220"
              style={{ border: 0, borderRadius: "1rem" }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
        </Card>
        <div className="flex flex-col items-center mx-auto mt-16 w-full max-w-6xl">
          <h3 className="mb-8 font-bold text-primary text-2xl tracking-tight">
            Leave a Nest Branches
          </h3>
          <div className="flex flex-row flex-wrap justify-center gap-12 px-4 py-10 rounded-2xl w-full">
            {[
              {
                name: "AMERICA",
                flag: (
                  <Card className="flex justify-center items-center bg-white mb-4 rounded-lg w-[140px] h-[84px] overflow-hidden">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                      alt="USA Flag"
                      className="w-full h-full object-contain"
                    />
                  </Card>
                ),
                address: (
                  <div className="text-center">
                    <div className="font-bold text-primary">
                      Leave a Nest America Inc.
                    </div>
                    <div className="mt-1 mb-2 text-muted-foreground text-sm">
                      3350 Scott Blvd. #5502, Santa Clara, CA 95054
                    </div>
                    <div className="flex justify-center">
                      <iframe
                        title="America Office Map"
                        src="https://www.google.com/maps?q=3350+Scott+Blvd.+%235502,+Santa+Clara,+CA+95054&output=embed"
                        width="260"
                        height="120"
                        style={{ border: 0, borderRadius: "0.75rem" }}
                        allowFullScreen={false}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                ),
              },
              {
                name: "SINGAPORE",
                flag: (
                  <Card className="flex justify-center items-center bg-white mb-4 rounded-lg w-[140px] h-[84px] overflow-hidden">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg"
                      alt="Singapore Flag"
                      className="w-full h-full object-contain"
                    />
                  </Card>
                ),
                address: (
                  <div className="text-center">
                    <div className="font-bold text-primary">
                      Leave a Nest Singapore Pte. Ltd.
                      <br />
                      (201026851H)
                    </div>
                    <div className="mt-1 mb-2 text-muted-foreground text-sm">
                      71 Ayer Rajah Crescent, #06-11/12, Singapore 139951
                    </div>
                    <div className="flex justify-center">
                      <iframe
                        title="Singapore Office Map"
                        src="https://www.google.com/maps?q=71+Ayer+Rajah+Crescent,+%2306-11%2F12,+Singapore+139951&output=embed"
                        width="260"
                        height="120"
                        style={{ border: 0, borderRadius: "0.75rem" }}
                        allowFullScreen={false}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                ),
              },
              {
                name: "MALAYSIA",
                flag: (
                  <Card className="flex justify-center items-center bg-white mb-4 rounded-lg w-[140px] h-[84px] overflow-hidden">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg"
                      alt="Malaysia Flag"
                      className="w-full h-full object-contain"
                    />
                  </Card>
                ),
                address: (
                  <div className="text-center">
                    <div className="font-bold text-primary">
                      Leave a Nest Malaysia Sdn. Bhd.
                    </div>
                    <div className="mt-1 mb-2 text-muted-foreground text-sm">
                      G-B, Block 2330, Century Square, Jalan Usahawan, Off
                      Persiaran Multimedia, 63000 Cyberjaya, Selangor
                    </div>
                    <div className="flex justify-center">
                      <iframe
                        title="Malaysia Office Map"
                        src="https://www.google.com/maps?q=G-B,+Block+2330,+Century+Square,+Jalan+Usahawan,+Off+Persiaran+Multimedia,+63000+Cyberjaya,+Selangor&output=embed"
                        width="260"
                        height="120"
                        style={{ border: 0, borderRadius: "0.75rem" }}
                        allowFullScreen={false}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                ),
              },
              {
                name: "UK",
                flag: (
                  <Card className="flex justify-center items-center bg-white mb-4 rounded-lg w-[140px] h-[84px] overflow-hidden">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                      alt="UK Flag"
                      className="w-full h-full object-contain"
                    />
                  </Card>
                ),
                address: (
                  <div className="text-center">
                    <div className="font-bold text-primary">
                      Leave a Nest United Kingdom Ltd.
                    </div>
                    <div className="mt-1 mb-2 text-muted-foreground text-sm">
                      IDEALondon, 69 Wilson St, London EC2A 2BB, UK
                    </div>
                    <div className="flex justify-center">
                      <iframe
                        title="UK Office Map"
                        src="https://www.google.com/maps?q=IDEALondon,+69+Wilson+St,+London+EC2A+2BB,+UK&output=embed"
                        width="260"
                        height="120"
                        style={{ border: 0, borderRadius: "0.75rem" }}
                        allowFullScreen={false}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                ),
              },
              {
                name: "JAPAN",
                flag: (
                  <Card className="flex justify-center items-center bg-white mb-4 rounded-lg w-[140px] h-[84px] overflow-hidden">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg"
                      alt="Japan Flag"
                      className="w-full h-full object-contain"
                    />
                  </Card>
                ),
                address: (
                  <div className="text-center">
                    <div className="font-bold text-primary">
                      Iidabasimiyuki Bld. (Reception : 4F floor)
                    </div>
                    <div className="mt-1 mb-2 text-muted-foreground text-sm">
                      1-4, Shimomiyabicho, Shinjuku-ku, Tokyo, 162-0822, Japan
                    </div>
                    <div className="flex justify-center">
                      <iframe
                        title="Japan Office Map"
                        src="https://www.google.com/maps?q=Iidabasimiyuki+Bld.+1-4,+Shimomiyabicho,+Shinjuku-ku,+Tokyo,+162-0822,+Japan&output=embed"
                        width="260"
                        height="120"
                        style={{ border: 0, borderRadius: "0.75rem" }}
                        allowFullScreen={false}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                ),
              },
            ].map((branch) => (
              <div
                key={branch.name}
                className="group relative flex flex-col items-center w-[180px]"
              >
                {branch.flag}
                <span className="font-bold text-foreground text-2xl tracking-tight">
                  {branch.name}
                </span>
                {branch.address && (
                  <div
                    className="top-full left-1/2 z-50 absolute flex flex-col justify-center items-center bg-background opacity-0 group-hover:opacity-100 shadow-2xl mt-2 p-4 rounded-2xl w-[320px] max-h-0 group-hover:max-h-[500px] overflow-hidden scale-95 group-hover:scale-100 transition-all -translate-x-1/2 animate-slideDown duration-300 pointer-events-none group-hover:pointer-events-auto"
                    style={{ minWidth: 220, maxWidth: 340 }}
                  >
                    {branch.address}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center mx-auto mt-20 w-full max-w-5xl">
          <h3 className="mb-8 font-bold text-primary text-2xl tracking-tight">
            Meet The Team
          </h3>
          <div className="flex flex-row flex-wrap justify-center gap-10 px-4 py-10 rounded-2xl w-full animate-breath-slow">
            {[
              {
                name: "William B. Flores",
                course: "BS Computer Science",
                image: willImg,
              },
              {
                name: "John Andrae L. Tuaño",
                course: "BS Computer Science",
                image: draeImg,
              },
              {
                name: "Darren L. Cabigao",
                course: "BS Computer Science",
                image: darenImg,
              },
            ].map((dev) => (
              <Card
                key={dev.name}
                className="flex flex-col items-center bg-background p-6 rounded-2xl w-[240px] hover:scale-105 transition-transform"
              >
                <div className="shadow mb-4 border-4 border-primary/30 rounded-full w-[180px] h-[180px] overflow-hidden">
                  <Image
                    src={dev.image}
                    alt={dev.name + " portrait"}
                    width={180}
                    height={180}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mb-1 font-bold text-foreground text-lg text-center tracking-tight">
                  {dev.name}
                </span>
                <span className="text-muted-foreground text-base text-center">
                  {dev.course}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </FadeInWrapper>
  );
};

export default About;
