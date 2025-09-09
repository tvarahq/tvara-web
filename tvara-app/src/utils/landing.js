import {
  Share2,
  SquareDashedMousePointer,
  Cable,
  Users,
  BookMarked,
  Plane,
} from "lucide-react";

import { Box, GitBranch, Server, Bookmark, Clock, Sun } from "lucide-react";

export const buttons = [
  {
    id: 1,
    title: "Visualized flows",
    description: "Design and deploy AI workflows with a simple, visual canvas.",
    icon: Share2,
    icon_color: "#007AFF",
  },
  {
    id: 2,
    title: "Drag, Drop",
    description: "Build automation like blocks, no wiring mess.",
    icon: SquareDashedMousePointer,
    icon_color: "#9747FF",
  },
  {
    id: 3,
    title: "Event-Driven Power",
    description: "Trigger workflows from events, APIs, or streams.",
    icon: Cable,
    icon_color: "#FF2D55",
  },
  {
    id: 4,
    title: "Credential Vault",
    description: "Securely manage keys and configs in one place.",
    icon: BookMarked,
    icon_color: "#34C759",
  },
  {
    id: 5,
    title: "Collaboration Ready",
    description: "Share and manage access with your team effortlessly.",
    icon: Users,
    icon_color: "#FFCC00",
  },
  {
    id: 6,
    title: "Easy Deploy",
    description: "Move from concept to production-level execution in minutes. ",
    icon: Plane,
    icon_color: "#00C7BE",
  },
];

export const features = [
  {
    index:1,
    icon: Box,
    title: "Under the Hood: SDK v1",
    description:
      "Behind the Canvas is our open-source SDK, ready for developers today. Build, extend, and customize agent workflows with Python.",
  },
  {
    index:2,
    icon: GitBranch,
    title: "Plug and Play Agents",
    description:
      "Create agents with memory, caching, and tools in just a few lines of code.",
  },
  {
    index:3,
    icon: Server,
    title: "Two Workflow Modes",
    description:
      "Run linear flows with Sequential mode or give a manager agent control with Supervised mode.",
  },
  {
    index:4,
    icon: Sun,
    title: "Customizable",
    description:
      "Create your own prompts, tools and integrations, ready to plug into your agents.",
  },
  {
    index:5,
    icon: Clock,
    title: "Get started in Seconds",
    description:
    "Tvara SDK is ready to use today. Install it directly from PyPI and start building your first agent in minutes.",
  },
  {
    index:6,
    icon: Bookmark,
    title: "Open Source and Documented",
    description:
      "Extend it, fork it, break it, or contribute. Everything is transparent and ready for builders.",
  },
];
