import pinkBadge from "@/public/badgetablepink.svg";
import yellowBadge from "@/public/yellowbadge.svg";
import { orange } from "@mui/material/colors";
import Image from "next/image";
import orangeBadge from "@/public/orange.svg";
import whiteBadge from "@/public/white.svg";
import dpinkBadge from "@/public/darkpink.svg";
import greyBadge from "@/public/grey.svg";
import greenBadge from "@/public/green.svg";
export const tablehead = [
  {
    id: "1",
    title: "Sector",
  },
  {
    id: "2",
    title: "Grads",
  },
  {
    id: "3",
    title: "Reg Students",
  },
  {
    id: "4",
    title: "Placed Students",
  },
  {
    id: "5",
    title: "Max CTC",
  },
  {
    id: "6",
    title: "Med CTC",
  },
  {
    id: "7",
    title: "Avg CTC",
  },
];

export const tableData = [
  {
    id: "1",
    sector: "CSE",
    badge: <Image src={pinkBadge}></Image>,
    grads: 520,
    reg_students: 480,
    placed_students: 186,
    max_ctc: "8.96(LPA)",
    med_ctc: "13.30LPA",
    avg_ctc: "20.25LPA",
  },
  {
    id: "2",
    sector: "ECE",
    badge: <Image src={yellowBadge}></Image>,
    grads: 520,
    reg_students: 480,
    placed_students: 186,
    max_ctc: "8.96(LPA)",
    med_ctc: "13.30LPA",
    avg_ctc: "20.25LPA",
  },
  {
    id: "3",
    sector: "ME",
    badge: <Image src={orangeBadge}></Image>,
    grads: 520,
    reg_students: 480,
    placed_students: 186,
    max_ctc: "8.96(LPA)",
    med_ctc: "13.30LPA",
    avg_ctc: "20.25LPA",
  },
  {
    id: "4",
    sector: "LAW",
    badge: <Image src={greyBadge}></Image>,
    grads: 520,
    reg_students: 480,
    placed_students: 186,
    max_ctc: "8.96(LPA)",
    med_ctc: "13.30LPA",
    avg_ctc: "20.25LPA",
  },
  {
    id: "5",
    sector: "ECOM",
    badge: <Image src={greenBadge}></Image>,
    grads: 520,
    reg_students: 480,
    placed_students: 186,
    max_ctc: "8.96(LPA)",
    med_ctc: "13.30LPA",
    avg_ctc: "20.25LPA",
  },
  {
    id: "6",
    sector: "BIO",
    badge: <Image src={dpinkBadge}></Image>,
    grads: 520,
    reg_students: 480,
    placed_students: 186,
    max_ctc: "8.96(LPA)",
    med_ctc: "13.30LPA",
    avg_ctc: "20.25LPA",
  },
  {
    id: "7",
    sector: "ARCH",
    badge: <Image src={whiteBadge}></Image>,
    grads: 520,
    reg_students: 480,
    placed_students: 186,
    max_ctc: "8.96(LPA)",
    med_ctc: "13.30LPA",
    avg_ctc: "20.25LPA",
  },
];
