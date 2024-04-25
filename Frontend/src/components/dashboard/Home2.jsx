import React, { useEffect, useState, useContext } from "react";
import "./styles.css"; // Import CSS file for styling
import ProjectDetails from "./ProjectDetails.jsx"; //";
// import { toast } from "react-toastify";

const Home = () => {
  const allProjects = [
    {
      _id: "6612292ce9b9456eeacc08e9",
      projectName: "Kodikas Edited 3",
      projectType: "Fixed Budget",
      durationMonths: 1,
      budgetedHours: 100,
      projectDescription:
        "Kodikas is a Coding Contest organized by CSE Department of MCKVIE",
      auditHistory: [
        {
          _id: "66175beaf53f78ae0e476eaf",
          dateOfAudit: "2024-04-04T00:00:00.000Z",
          reviewedBy: {
            _id: "6611211f607cbbf2243d39b1",
            email: "projectmanager1@gmail.com",
            name: "PM Tiwary",
            role: "projectmanager",
            __v: 0,
          },
          status: "Delayed",
          reviewedSection: "hah",
          commentQueries: "no",
          actionItem: "none",
          createdAt: "2024-04-11T03:41:30.869Z",
          updatedAt: "2024-04-11T04:04:43.908Z",
          __v: 0,
        },
        {
          _id: "661765a9f53f78ae0e477009",
          dateOfAudit: "2024-04-04T00:00:00.000Z",
          reviewedBy: {
            _id: "66112190607cbbf2243d39bd",
            email: "auditor2@gmail.com",
            name: "Auditor Sree Pamarthi",
            role: "auditor",
            __v: 0,
          },
          status: "Delayed",
          reviewedSection: "Sprints",
          commentQueries: "A little delayed",
          actionItem: "To increase working hours",
          createdAt: "2024-04-11T04:23:05.272Z",
          updatedAt: "2024-04-11T04:23:05.272Z",
          __v: 0,
        },
      ],
      stakeholders: {
        _id: "6612292ce9b9456eeacc08e7",
        PM: [
          {
            _id: "6611211f607cbbf2243d39b1",
            email: "projectmanager1@gmail.com",
            name: "PM Tiwary",
            role: "projectmanager",
            __v: 0,
          },
        ],
        Auditor: [
          {
            _id: "66112177607cbbf2243d39ba",
            email: "auditor1@gmail.com",
            name: "Auditor Tiwary",
            role: "auditor",
            __v: 0,
          },
          {
            _id: "66112190607cbbf2243d39bd",
            email: "auditor2@gmail.com",
            name: "Auditor Sree Pamarthi",
            role: "auditor",
            __v: 0,
          },
        ],
        Client: [
          {
            _id: "66112217607cbbf2243d39c6",
            email: "anamikatiwary20@gmail.com",
            name: "Anamika",
            role: "client",
            __v: 0,
          },
        ],
        createdAt: "2024-04-07T05:03:40.237Z",
        updatedAt: "2024-04-07T05:03:40.237Z",
        __v: 0,
      },
      riskProfiling: [
        {
          _id: "6613c55c5bc8ca76f3214765",
          riskType: "Financial",
          description: "tes",
          severity: "Medium",
          impact: "Medium",
          remedialSteps: "test",
          status: "test",
          closureDate: "2024-04-03T00:00:00.000Z",
          createdAt: "2024-04-08T10:22:20.698Z",
          updatedAt: "2024-04-08T10:22:20.698Z",
          __v: 0,
        },
      ],
      approvedTeam: [
        {
          _id: "6618261bc9c0a61ba7d54d43",
          phaseNumber: 1,
          details: [
            {
              numberOfResources: 5,
              role: "Admin",
              availability: 90,
              duration: 1,
              _id: "66182b94c9c0a61ba7d54f80",
            },
            {
              numberOfResources: 30,
              role: "Engineer",
              availability: 70,
              duration: 3,
              _id: "66182b94c9c0a61ba7d54f81",
            },
            {
              numberOfResources: 5,
              role: "Auditor",
              availability: 90,
              duration: 1,
              _id: "66182b94c9c0a61ba7d54f82",
            },
            {
              numberOfResources: 10,
              role: "Project Manager",
              availability: 80,
              duration: 5,
              _id: "66182b94c9c0a61ba7d54f83",
            },
          ],
          __v: 0,
        },
        {
          _id: "66182902c9c0a61ba7d54e32",
          phaseNumber: 2,
          details: [
            {
              numberOfResources: 5,
              role: "Admin",
              availability: 90,
              duration: 1,
              _id: "66182902c9c0a61ba7d54e33",
            },
            {
              numberOfResources: 10,
              role: "Auditor",
              availability: 80,
              duration: 10,
              _id: "66182902c9c0a61ba7d54e34",
            },
          ],
          __v: 0,
        },
        {
          _id: "66182921c9c0a61ba7d54e79",
          phaseNumber: 3,
          details: [
            {
              numberOfResources: 5,
              role: "Admin",
              availability: 90,
              duration: 1,
              _id: "66182921c9c0a61ba7d54e7a",
            },
            {
              numberOfResources: 10,
              role: "Auditor",
              availability: 80,
              duration: 10,
              _id: "66182921c9c0a61ba7d54e7b",
            },
          ],
          __v: 0,
        },
        {
          _id: "66184112948786424a7b08f5",
          phaseNumber: 3,
          details: [
            {
              numberOfResources: 1,
              role: "dev",
              availability: 20,
              duration: 1,
              _id: "66184112948786424a7b08f6",
            },
          ],
          __v: 0,
        },
      ],
      resources: [
        {
          _id: "6613d9b8712883c1f97953ea",
          name: "Anamika",
          role: "Developer",
          startDate: "2024-04-03T00:00:00.000Z",
          endDate: "2024-04-02T00:00:00.000Z",
          comments: "Anamika is an Intern",
          createdAt: "2024-04-08T11:49:12.703Z",
          updatedAt: "2024-04-08T12:16:03.378Z",
          __v: 0,
        },
      ],
      clientFeedback: [
        {
          _id: "661627fb5f59d849415740ec",
          type: "Appreciation",
          dateReceived: "2024-04-04T00:00:00.000Z",
          detailedFeedback: "test",
          actionTaken: "test",
          closureDate: "2024-04-11T00:00:00.000Z",
          createdAt: "2024-04-10T05:47:39.120Z",
          updatedAt: "2024-04-10T05:47:39.120Z",
          __v: 0,
        },
      ],
      projectUpdates: [
        {
          _id: "661399248335d8428fee9e35",
          date: "2024-04-02T00:00:00.000Z",
          generalUpdates: "updates",
          createdAt: "2024-04-08T07:13:40.749Z",
          updatedAt: "2024-04-08T07:13:40.749Z",
          __v: 0,
        },
        {
          _id: "661399378335d8428fee9e3d",
          date: "2024-04-02T00:00:00.000Z",
          generalUpdates: "updates",
          createdAt: "2024-04-08T07:13:59.295Z",
          updatedAt: "2024-04-08T07:13:59.295Z",
          __v: 0,
        },
        {
          _id: "66139ba6b45eef003b661a07",
          date: "2024-04-02T00:00:00.000Z",
          generalUpdates: "these are updates",
          createdAt: "2024-04-08T07:24:22.097Z",
          updatedAt: "2024-04-08T07:24:22.097Z",
          __v: 0,
        },
      ],
      moms: [
        {
          _id: "66162b055f59d84941574161",
          date: "2024-04-03T00:00:00.000Z",
          duration: 2,
          momLink: "abc",
          comments: "abncd",
          createdAt: "2024-04-10T06:00:37.445Z",
          updatedAt: "2024-04-10T06:00:37.445Z",
          __v: 0,
        },
      ],
      versionHistory: [
        {
          versionNumber: 1,
          version: {
            _id: "6614cdc0986a24676d2bbe26",
            type: "fixed",
            change: "plan",
            changeReason: "shortage of people",
            createdBy: {
              _id: "6611211f607cbbf2243d39b1",
              email: "projectmanager1@gmail.com",
              name: "PM Tiwary",
              role: "projectmanager",
              __v: 0,
            },
            revisionDate: "2024-04-02T00:00:00.000Z",
            approvalDate: "2024-04-03T00:00:00.000Z",
            approvedBy: {
              _id: "66112190607cbbf2243d39bd",
              email: "auditor2@gmail.com",
              name: "Auditor Sree Pamarthi",
              role: "auditor",
              __v: 0,
            },
            createdAt: "2024-04-09T05:10:24.827Z",
            updatedAt: "2024-04-10T11:14:39.318Z",
            __v: 0,
          },
          _id: "6614cdc0986a24676d2bbe28",
        },
        {
          versionNumber: 2,
          version: {
            _id: "6614d5c731336450887c6b05",
            type: "Fixed Budget",
            change: "plan",
            changeReason: "shortage of people",
            createdBy: {
              _id: "6611211f607cbbf2243d39b1",
              email: "projectmanager1@gmail.com",
              name: "PM Tiwary",
              role: "projectmanager",
              __v: 0,
            },
            revisionDate: "2024-04-04T00:00:00.000Z",
            approvalDate: "2024-04-05T00:00:00.000Z",
            approvedBy: {
              _id: "66112177607cbbf2243d39ba",
              email: "auditor1@gmail.com",
              name: "Auditor Tiwary",
              role: "auditor",
              __v: 0,
            },
            createdAt: "2024-04-09T05:44:39.099Z",
            updatedAt: "2024-04-09T05:44:39.099Z",
            __v: 0,
          },
          _id: "6614d5c731336450887c6b07",
        },
        {
          versionNumber: 3,
          version: {
            _id: "66162fcb5f59d84941574236",
            type: "Fixed Budget",
            change: "plan",
            changeReason: "denial",
            createdBy: {
              _id: "6611211f607cbbf2243d39b1",
              email: "projectmanager1@gmail.com",
              name: "PM Tiwary",
              role: "projectmanager",
              __v: 0,
            },
            revisionDate: "2024-04-04T00:00:00.000Z",
            approvalDate: "2024-04-04T00:00:00.000Z",
            approvedBy: {
              _id: "66112190607cbbf2243d39bd",
              email: "auditor2@gmail.com",
              name: "Auditor Sree Pamarthi",
              role: "auditor",
              __v: 0,
            },
            createdAt: "2024-04-10T06:20:59.433Z",
            updatedAt: "2024-04-10T06:20:59.433Z",
            __v: 0,
          },
          _id: "66162fcb5f59d84941574238",
        },
      ],
      operationalMatrix: [
        {
          escalationLevel: 1,
          name: {
            _id: "6611211f607cbbf2243d39b1",
            email: "projectmanager1@gmail.com",
            name: "PM Tiwary",
            role: "projectmanager",
            __v: 0,
          },
          _id: "661777ddf53f78ae0e47703a",
        },
      ],
      financialMatrix: [
        {
          escalationLevel: 1,
          name: {
            _id: "66112146607cbbf2243d39b7",
            email: "projectmanager3@gmail.com",
            name: "Firoja Parveen",
            role: "projectmanager",
            __v: 0,
          },
          _id: "66177991f53f78ae0e477081",
        },
      ],
      technicalMatrix: [],
      phases: [
        {
          phaseNumber: 1,
          phase: {
            _id: "661645ab5f59d849415743dc",
            title: "abcd",
            startDate: "2024-04-04T00:00:00.000Z",
            completionDate: "2024-04-03T00:00:00.000Z",
            approvalDate: "2024-04-11T00:00:00.000Z",
            status: "Delayed",
            revisedCompletionDate: "2024-04-09T00:00:00.000Z",
            comments: "abcd",
            createdAt: "2024-04-10T07:54:19.973Z",
            updatedAt: "2024-04-10T07:54:19.973Z",
            __v: 0,
          },
          _id: "661645ac5f59d849415743de",
        },
      ],
      sprints: [
        {
          sprintNumber: 1,
          sprint: {
            _id: "661515085f0b8c4dbe7014d8",
            startDate: "2024-04-04T00:00:00.000Z",
            endDate: "2024-04-03T00:00:00.000Z",
            status: "Delayed",
            comments: "trial sprint 1234",
            createdAt: "2024-04-09T10:14:32.607Z",
            updatedAt: "2024-04-10T10:54:43.643Z",
            __v: 0,
          },
          _id: "661515085f0b8c4dbe7014da",
        },
      ],
      createdAt: "2024-04-07T05:03:40.334Z",
      updatedAt: "2024-04-11T19:59:14.944Z",
      __v: 47,
      scope: "this is trial scope ",
      detailedTimelineReference: "2 months",
    },
    {
      _id: "6612354fc627afe60a8a2ecf",
      projectName: "BrainRush",
      projectType: "Monthly",
      durationMonths: 2,
      budgetedHours: 20,
      projectDescription:
        "BrainRush is a Fun Event organized by CSE Department of MCKVIE",
      auditHistory: [],
      stakeholders: {
        _id: "6612354fc627afe60a8a2ecd",
        PM: [
          {
            _id: "6611211f607cbbf2243d39b1",
            email: "projectmanager1@gmail.com",
            name: "PM Tiwary",
            role: "projectmanager",
            __v: 0,
          },
        ],
        Auditor: [
          {
            _id: "66112177607cbbf2243d39ba",
            email: "auditor1@gmail.com",
            name: "Auditor Tiwary",
            role: "auditor",
            __v: 0,
          },
          {
            _id: "66112190607cbbf2243d39bd",
            email: "auditor2@gmail.com",
            name: "Auditor Sree Pamarthi",
            role: "auditor",
            __v: 0,
          },
        ],
        Client: [
          {
            _id: "66112217607cbbf2243d39c6",
            email: "anamikatiwary20@gmail.com",
            name: "Anamika",
            role: "client",
            __v: 0,
          },
        ],
        createdAt: "2024-04-07T05:55:27.641Z",
        updatedAt: "2024-04-07T05:55:27.641Z",
        __v: 0,
      },
      riskProfiling: [],
      resources: [],
      clientFeedback: [],
      projectUpdates: [],
      moms: [],
      versionHistory: [],
      operationalMatrix: [],
      financialMatrix: [],
      technicalMatrix: [],
      phases: [],
      sprints: [],
      createdAt: "2024-04-07T05:55:27.719Z",
      updatedAt: "2024-04-07T05:55:27.719Z",
      __v: 0,
    },
    {
      _id: "66123751c627afe60a8a2eed",
      projectName: "Project 4",
      projectType: "Fixed Budget",
      durationMonths: 12,
      budgetedHours: 123,
      projectDescription: "Demo",
      auditHistory: [],
      stakeholders: {
        _id: "66123751c627afe60a8a2eeb",
        PM: [
          {
            _id: "6611211f607cbbf2243d39b1",
            email: "projectmanager1@gmail.com",
            name: "PM Tiwary",
            role: "projectmanager",
            __v: 0,
          },
        ],
        Auditor: [
          {
            _id: "66112177607cbbf2243d39ba",
            email: "auditor1@gmail.com",
            name: "Auditor Tiwary",
            role: "auditor",
            __v: 0,
          },
        ],
        Client: [
          {
            _id: "66112217607cbbf2243d39c6",
            email: "anamikatiwary20@gmail.com",
            name: "Anamika",
            role: "client",
            __v: 0,
          },
        ],
        createdAt: "2024-04-07T06:04:01.412Z",
        updatedAt: "2024-04-07T06:04:01.412Z",
        __v: 0,
      },
      riskProfiling: [],
      resources: [],
      clientFeedback: [],
      projectUpdates: [],
      moms: [],
      versionHistory: [],
      operationalMatrix: [],
      financialMatrix: [],
      technicalMatrix: [],
      phases: [],
      sprints: [],
      createdAt: "2024-04-07T06:04:01.508Z",
      updatedAt: "2024-04-07T06:04:01.508Z",
      __v: 0,
    },
    {
      _id: "66123cd56a6d23029a5d989f",
      projectName: "ahahadadafafaf",
      projectType: "Fixed Budget",
      durationMonths: 1331,
      budgetedHours: 2424,
      projectDescription: "afgwfafafa",
      auditHistory: [],
      stakeholders: {
        _id: "66123cd56a6d23029a5d989d",
        PM: [
          {
            _id: "6611211f607cbbf2243d39b1",
            email: "projectmanager1@gmail.com",
            name: "PM Tiwary",
            role: "projectmanager",
            __v: 0,
          },
        ],
        Auditor: [],
        Client: [],
        createdAt: "2024-04-07T06:27:33.034Z",
        updatedAt: "2024-04-07T06:27:33.034Z",
        __v: 0,
      },
      riskProfiling: [],
      resources: [],
      clientFeedback: [],
      projectUpdates: [],
      moms: [],
      versionHistory: [],
      operationalMatrix: [],
      financialMatrix: [],
      technicalMatrix: [],
      phases: [],
      sprints: [],
      createdAt: "2024-04-07T06:27:33.215Z",
      updatedAt: "2024-04-07T06:27:33.215Z",
      __v: 0,
    },
    {
      _id: "66123d206a6d23029a5d98a5",
      projectName: "New Project",
      projectType: "Fixed Budget",
      durationMonths: 31,
      budgetedHours: 421,
      projectDescription: "Hello",
      auditHistory: [],
      stakeholders: {
        _id: "66123d206a6d23029a5d98a3",
        PM: [
          {
            _id: "66112137607cbbf2243d39b4",
            email: "projectmanager2@gmail.com",
            name: "Dipa Majumdar",
            role: "projectmanager",
            __v: 0,
          },
        ],
        Auditor: [],
        Client: [
          {
            _id: "661121c6607cbbf2243d39c0",
            email: "client1@gmail.com",
            name: "Bharat Law",
            role: "client",
            __v: 0,
          },
        ],
        createdAt: "2024-04-07T06:28:48.424Z",
        updatedAt: "2024-04-07T06:28:48.424Z",
        __v: 0,
      },
      riskProfiling: [],
      resources: [],
      clientFeedback: [],
      projectUpdates: [],
      moms: [],
      versionHistory: [],
      operationalMatrix: [],
      financialMatrix: [],
      technicalMatrix: [],
      phases: [],
      sprints: [],
      createdAt: "2024-04-07T06:28:48.499Z",
      updatedAt: "2024-04-07T06:28:48.499Z",
      __v: 0,
    },
    {
      _id: "66123d586a6d23029a5d98ab",
      projectName: "ahahadada",
      projectType: "Fixed Budget",
      durationMonths: 23,
      budgetedHours: 3,
      projectDescription: "abaab",
      auditHistory: [],
      stakeholders: {
        _id: "66123d586a6d23029a5d98a9",
        PM: [
          {
            _id: "66112137607cbbf2243d39b4",
            email: "projectmanager2@gmail.com",
            name: "Dipa Majumdar",
            role: "projectmanager",
            __v: 0,
          },
        ],
        Auditor: [],
        Client: [
          {
            _id: "661121c6607cbbf2243d39c0",
            email: "client1@gmail.com",
            name: "Bharat Law",
            role: "client",
            __v: 0,
          },
        ],
        createdAt: "2024-04-07T06:29:44.358Z",
        updatedAt: "2024-04-07T06:29:44.358Z",
        __v: 0,
      },
      riskProfiling: [],
      resources: [],
      clientFeedback: [],
      projectUpdates: [],
      moms: [],
      versionHistory: [],
      operationalMatrix: [],
      financialMatrix: [],
      technicalMatrix: [],
      phases: [],
      sprints: [],
      createdAt: "2024-04-07T06:29:44.481Z",
      updatedAt: "2024-04-07T06:29:44.481Z",
      __v: 0,
    },
    {
      _id: "6614c4d9dee47ec97bc31671",
      projectName: "Project N",
      projectType: "Monthly",
      durationMonths: 2,
      budgetedHours: 3,
      projectDescription: "this is desc",
      auditHistory: [],
      stakeholders: {
        _id: "6614c4d9dee47ec97bc3166f",
        PM: [
          {
            _id: "6611211f607cbbf2243d39b1",
            email: "projectmanager1@gmail.com",
            name: "PM Tiwary",
            role: "projectmanager",
            __v: 0,
          },
        ],
        Auditor: [
          {
            _id: "66112177607cbbf2243d39ba",
            email: "auditor1@gmail.com",
            name: "Auditor Tiwary",
            role: "auditor",
            __v: 0,
          },
        ],
        Client: [
          {
            _id: "661121c6607cbbf2243d39c0",
            email: "client1@gmail.com",
            name: "Bharat Law",
            role: "client",
            __v: 0,
          },
        ],
        createdAt: "2024-04-09T04:32:25.344Z",
        updatedAt: "2024-04-09T04:32:25.344Z",
        __v: 0,
      },
      riskProfiling: [],
      resources: [],
      clientFeedback: [],
      projectUpdates: [],
      moms: [],
      versionHistory: [],
      operationalMatrix: [],
      financialMatrix: [],
      technicalMatrix: [],
      phases: [],
      sprints: [],
      createdAt: "2024-04-09T04:32:25.419Z",
      updatedAt: "2024-04-09T04:32:25.419Z",
      __v: 0,
    },
    {
      _id: "661521133e422440adacc51a",
      projectName: "New Project with Project Stack",
      projectType: "Fixed Budget",
      durationMonths: 8,
      budgetedHours: 200,
      projectDescription: "This is a description of my project 3",
      auditHistory: [],
      projectStack: {
        _id: "661521133e422440adacc516",
        backend: ["Node Js"],
        frontend: ["React"],
        mobileApp: ["Flutter"],
        database: ["MongoDB"],
        infrastructureAndServices: ["AWS"],
        createdAt: "2024-04-09T11:05:55.437Z",
        updatedAt: "2024-04-10T05:26:00.845Z",
        __v: 0,
      },
      stakeholders: {
        _id: "661521133e422440adacc517",
        PM: [],
        Auditor: [],
        Client: [],
        createdAt: "2024-04-09T11:05:55.508Z",
        updatedAt: "2024-04-09T11:05:55.508Z",
        __v: 0,
      },
      riskProfiling: [],
      approvedTeam: [
        {
          _id: "6617a61e731b3919000c58b4",
          phaseNumber: 1,
          details: [
            {
              numberOfResources: 10,
              role: "Developer",
              availability: 90,
              duration: 10,
              _id: "6617a61e731b3919000c58b5",
            },
            {
              numberOfResources: 5,
              role: "QA",
              availability: 95,
              duration: 4,
              _id: "6617a61e731b3919000c58b6",
            },
          ],
          __v: 0,
        },
      ],
      resources: [
        {
          _id: "6616250531882e41dea04665",
          name: "this is a resource",
          role: "dev",
          startDate: "2024-04-03T00:00:00.000Z",
          endDate: "2024-04-16T00:00:00.000Z",
          comments: "good",
          createdAt: "2024-04-10T05:35:01.824Z",
          updatedAt: "2024-04-10T05:35:01.824Z",
          __v: 0,
        },
        {
          _id: "661625b431882e41dea04685",
          name: "Anamika Tiwary",
          role: "SDE1",
          startDate: "2024-04-03T00:00:00.000Z",
          endDate: "2024-04-04T00:00:00.000Z",
          comments: "abcd",
          createdAt: "2024-04-10T05:37:56.554Z",
          updatedAt: "2024-04-10T05:37:56.554Z",
          __v: 0,
        },
      ],
      clientFeedback: [
        {
          _id: "6616e08b2df08837ccc5d28a",
          type: "Appreciation",
          dateReceived: "2024-04-03T00:00:00.000Z",
          detailedFeedback: "abcd",
          actionTaken: "none",
          closureDate: "2024-04-02T00:00:00.000Z",
          createdAt: "2024-04-10T18:55:07.779Z",
          updatedAt: "2024-04-10T18:55:07.779Z",
          __v: 0,
        },
      ],
      projectUpdates: [
        {
          _id: "66161fc531882e41dea0456f",
          date: "2024-04-03T00:00:00.000Z",
          generalUpdates: "this is first updatehdbhf",
          createdAt: "2024-04-10T05:12:37.602Z",
          updatedAt: "2024-04-10T05:13:13.395Z",
          __v: 0,
        },
        {
          _id: "661623a831882e41dea04607",
          date: "2024-04-03T00:00:00.000Z",
          generalUpdates: "update 2",
          createdAt: "2024-04-10T05:29:12.611Z",
          updatedAt: "2024-04-10T05:29:12.611Z",
          __v: 0,
        },
        {
          _id: "661624b431882e41dea0463f",
          date: "2024-04-04T00:00:00.000Z",
          generalUpdates: "updatesss",
          createdAt: "2024-04-10T05:33:40.520Z",
          updatedAt: "2024-04-10T05:34:14.178Z",
          __v: 0,
        },
      ],
      moms: [
        {
          _id: "6616e0f486ab7dec74e61170",
          date: "2024-04-03T00:00:00.000Z",
          duration: 2,
          momLink: "abcd",
          comments: "test",
          createdAt: "2024-04-10T18:56:52.784Z",
          updatedAt: "2024-04-10T18:56:52.784Z",
          __v: 0,
        },
      ],
      versionHistory: [],
      operationalMatrix: [],
      financialMatrix: [],
      technicalMatrix: [
        {
          escalationLevel: 1,
          name: {
            _id: "66112146607cbbf2243d39b7",
            email: "projectmanager3@gmail.com",
            name: "Firoja Parveen",
            role: "projectmanager",
            __v: 0,
          },
          _id: "66168b92b0bb1bc760846da7",
        },
        {
          escalationLevel: 2,
          name: {
            _id: "66112137607cbbf2243d39b4",
            email: "projectmanager2@gmail.com",
            name: "Dipa Majumdar",
            role: "projectmanager",
            __v: 0,
          },
          _id: "66168cd7b0bb1bc760846e9a",
        },
      ],
      phases: [],
      sprints: [
        {
          sprintNumber: 1,
          sprint: {
            _id: "6616e2266e6594ecf7857e5a",
            startDate: "2024-04-04T00:00:00.000Z",
            endDate: "2024-04-03T00:00:00.000Z",
            status: "On-time",
            comments: "abcd",
            createdAt: "2024-04-10T19:01:58.023Z",
            updatedAt: "2024-04-10T19:01:58.023Z",
            __v: 0,
          },
          _id: "6616e2266e6594ecf7857e5c",
        },
      ],
      createdAt: "2024-04-09T11:05:55.587Z",
      updatedAt: "2024-04-11T08:58:37.666Z",
      __v: 12,
    },
    {
      _id: "6617ab44b76155074cd26031",
      projectName: "New Project Bro",
      projectType: "Fixed Budget",
      durationMonths: 1,
      budgetedHours: 100,
      projectDescription: "New Project Description",
      auditHistory: [
        {
          _id: "6617ad15b76155074cd26106",
          dateOfAudit: "2024-04-11T00:00:00.000Z",
          reviewedBy: {
            _id: "66112177607cbbf2243d39ba",
            email: "auditor1@gmail.com",
            name: "Auditor Tiwary",
            role: "auditor",
            __v: 0,
          },
          status: "Delayed",
          reviewedSection: "hahaha",
          commentQueries: "NA",
          actionItem: "NA",
          createdAt: "2024-04-11T09:27:49.028Z",
          updatedAt: "2024-04-11T09:33:29.254Z",
          __v: 0,
        },
        {
          _id: "6617ae98b76155074cd261d0",
          dateOfAudit: "2024-04-11T00:00:00.000Z",
          reviewedBy: {
            _id: "66112190607cbbf2243d39bd",
            email: "auditor2@gmail.com",
            name: "Auditor Sree Pamarthi",
            role: "auditor",
            __v: 0,
          },
          status: "Ongoing",
          reviewedSection: "Sprints",
          commentQueries: "NA",
          actionItem: "NA",
          createdAt: "2024-04-11T09:34:16.779Z",
          updatedAt: "2024-04-11T09:34:16.779Z",
          __v: 0,
        },
      ],
      projectStack: {
        _id: "6617ab44b76155074cd2602d",
        backend: [],
        frontend: [],
        mobileApp: [],
        database: [],
        infrastructureAndServices: [],
        createdAt: "2024-04-11T09:20:04.476Z",
        updatedAt: "2024-04-11T09:20:04.476Z",
        __v: 0,
      },
      stakeholders: {
        _id: "6617ab44b76155074cd2602e",
        PM: [
          {
            _id: "6611211f607cbbf2243d39b1",
            email: "projectmanager1@gmail.com",
            name: "PM Tiwary",
            role: "projectmanager",
            __v: 0,
          },
        ],
        Auditor: [
          {
            _id: "66112177607cbbf2243d39ba",
            email: "auditor1@gmail.com",
            name: "Auditor Tiwary",
            role: "auditor",
            __v: 0,
          },
          {
            _id: "66112190607cbbf2243d39bd",
            email: "auditor2@gmail.com",
            name: "Auditor Sree Pamarthi",
            role: "auditor",
            __v: 0,
          },
        ],
        Client: [
          {
            _id: "66112217607cbbf2243d39c6",
            email: "anamikatiwary20@gmail.com",
            name: "Anamika",
            role: "client",
            __v: 0,
          },
        ],
        createdAt: "2024-04-11T09:20:04.553Z",
        updatedAt: "2024-04-11T09:20:04.553Z",
        __v: 0,
      },
      riskProfiling: [],
      approvedTeam: [],
      resources: [],
      clientFeedback: [
        {
          _id: "6617ab9db76155074cd2605e",
          type: "Appreciation",
          dateReceived: "2024-04-11T00:00:00.000Z",
          detailedFeedback: "Good Work",
          actionTaken: "NA",
          closureDate: "2024-04-11T00:00:00.000Z",
          createdAt: "2024-04-11T09:21:33.127Z",
          updatedAt: "2024-04-11T09:21:33.127Z",
          __v: 0,
        },
        {
          _id: "6617ac09b76155074cd26088",
          type: "Complaint",
          dateReceived: "2024-04-11T00:00:00.000Z",
          detailedFeedback: "Good Company",
          actionTaken: "Promotion",
          closureDate: "2024-04-12T00:00:00.000Z",
          createdAt: "2024-04-11T09:23:21.767Z",
          updatedAt: "2024-04-11T09:23:21.767Z",
          __v: 0,
        },
      ],
      projectUpdates: [],
      moms: [],
      versionHistory: [],
      operationalMatrix: [],
      financialMatrix: [],
      technicalMatrix: [],
      phases: [],
      sprints: [],
      createdAt: "2024-04-11T09:20:04.614Z",
      updatedAt: "2024-04-11T09:34:16.832Z",
      __v: 4,
    },
    {
      _id: "6617b876fc76ba813b0984ab",
      projectName: "Jay Project 1",
      projectType: "Fixed Budget",
      durationMonths: 1,
      budgetedHours: 2,
      projectDescription: "Project Guide",
      auditHistory: [],
      projectStack: {
        _id: "6617b875fc76ba813b0984a7",
        backend: [],
        frontend: [],
        mobileApp: [],
        database: [],
        infrastructureAndServices: [],
        createdAt: "2024-04-11T10:16:22.000Z",
        updatedAt: "2024-04-11T10:16:22.000Z",
        __v: 0,
      },
      stakeholders: {
        _id: "6617b875fc76ba813b0984a8",
        PM: [
          {
            _id: "6617b6e5b76155074cd2637c",
            email: "jay@gmail.com",
            name: "Jay",
            role: "projectmanager",
            __v: 0,
          },
        ],
        Auditor: [
          {
            _id: "66112190607cbbf2243d39bd",
            email: "auditor2@gmail.com",
            name: "Auditor Sree Pamarthi",
            role: "auditor",
            __v: 0,
          },
        ],
        Client: [
          {
            _id: "66112217607cbbf2243d39c6",
            email: "anamikatiwary20@gmail.com",
            name: "Anamika",
            role: "client",
            __v: 0,
          },
        ],
        createdAt: "2024-04-11T10:16:22.120Z",
        updatedAt: "2024-04-11T10:16:22.120Z",
        __v: 0,
      },
      riskProfiling: [
        {
          _id: "6617de22480865734a418fa9",
          riskType: "Technical",
          description: "administrator",
          severity: "Low",
          impact: "Low",
          remedialSteps: "test",
          status: "Ongoing",
          closureDate: "2024-04-18T00:00:00.000Z",
          createdAt: "2024-04-11T12:57:06.899Z",
          updatedAt: "2024-04-11T12:57:06.899Z",
          __v: 0,
        },
      ],
      approvedTeam: [],
      resources: [
        {
          _id: "6617c85afc76ba813b098598",
          name: "ABC",
          role: "Dev",
          startDate: "2024-04-11T00:00:00.000Z",
          endDate: "2024-04-25T00:00:00.000Z",
          comments: "test comments",
          createdAt: "2024-04-11T11:24:10.268Z",
          updatedAt: "2024-04-11T11:24:25.315Z",
          __v: 0,
        },
      ],
      clientFeedback: [],
      projectUpdates: [],
      moms: [
        {
          _id: "6617c8dfb0e43329bc64c461",
          date: "2024-04-03T00:00:00.000Z",
          duration: 2,
          momLink: "abcd.com",
          comments: "comments",
          createdAt: "2024-04-11T11:26:23.475Z",
          updatedAt: "2024-04-11T11:26:23.475Z",
          __v: 0,
        },
      ],
      versionHistory: [],
      operationalMatrix: [],
      financialMatrix: [],
      technicalMatrix: [],
      phases: [],
      sprints: [],
      createdAt: "2024-04-11T10:16:22.341Z",
      updatedAt: "2024-04-11T19:44:43.407Z",
      __v: 4,
      scope: "New Scope",
    },
    {
      _id: "6618e2fffc6c6fb9780d5179",
      projectName: "Test New",
      projectType: "Fixed Budget",
      durationMonths: 2,
      budgetedHours: 3,
      projectDescription: "this is test",
      auditHistory: [],
      projectStack: {
        _id: "6618e2fffc6c6fb9780d5175",
        backend: ["node"],
        frontend: [],
        mobileApp: [],
        database: [],
        infrastructureAndServices: [],
        createdAt: "2024-04-12T07:30:07.221Z",
        updatedAt: "2024-04-12T07:30:29.723Z",
        __v: 0,
      },
      stakeholders: {
        _id: "6618e2fffc6c6fb9780d5176",
        PM: [
          {
            _id: "6617b6e5b76155074cd2637c",
            email: "jay@gmail.com",
            name: "Jay",
            role: "projectmanager",
            __v: 0,
          },
        ],
        Auditor: [
          {
            _id: "66112190607cbbf2243d39bd",
            email: "auditor2@gmail.com",
            name: "Auditor Sree Pamarthi",
            role: "auditor",
            __v: 0,
          },
        ],
        Client: [
          {
            _id: "661121c6607cbbf2243d39c0",
            email: "client1@gmail.com",
            name: "Bharat Law",
            role: "client",
            __v: 0,
          },
        ],
        createdAt: "2024-04-12T07:30:07.258Z",
        updatedAt: "2024-04-12T07:30:07.258Z",
        __v: 0,
      },
      riskProfiling: [],
      approvedTeam: [],
      resources: [],
      clientFeedback: [],
      projectUpdates: [],
      moms: [],
      versionHistory: [],
      operationalMatrix: [],
      financialMatrix: [],
      technicalMatrix: [],
      phases: [],
      sprints: [],
      createdAt: "2024-04-12T07:30:07.296Z",
      updatedAt: "2024-04-12T07:30:07.296Z",
      __v: 0,
    },
    {
      _id: "661e506a7a2d71dc58355f99",
      projectName: "New Project Demo",
      projectType: "Fixed Budget",
      durationMonths: 2,
      budgetedHours: 3,
      projectDescription: "this is my new demo",
      auditHistory: [
        {
          _id: "661e50937a2d71dc58355fd8",
          dateOfAudit: "2024-04-09T00:00:00.000Z",
          reviewedBy: {
            _id: "66112177607cbbf2243d39ba",
            email: "auditor1@gmail.com",
            name: "Auditor Tiwary",
            role: "auditor",
            __v: 0,
          },
          status: "Ongoing",
          reviewedSection: "Resources",
          commentQueries: "this is audits",
          actionItem: "none",
          createdAt: "2024-04-16T10:18:59.300Z",
          updatedAt: "2024-04-16T10:18:59.300Z",
          __v: 0,
        },
      ],
      projectStack: {
        _id: "661e506a7a2d71dc58355f95",
        backend: [],
        frontend: [],
        mobileApp: [],
        database: [],
        infrastructureAndServices: [],
        createdAt: "2024-04-16T10:18:18.317Z",
        updatedAt: "2024-04-16T10:18:18.317Z",
        __v: 0,
      },
      stakeholders: {
        _id: "661e506a7a2d71dc58355f96",
        PM: [
          {
            _id: "66112146607cbbf2243d39b7",
            email: "projectmanager3@gmail.com",
            name: "Firoja Parveen",
            role: "projectmanager",
            __v: 0,
          },
        ],
        Auditor: [
          {
            _id: "66112177607cbbf2243d39ba",
            email: "auditor1@gmail.com",
            name: "Auditor Tiwary",
            role: "auditor",
            __v: 0,
          },
        ],
        Client: [
          {
            _id: "661e4ff97a2d71dc58355f2b",
            email: "jaygodhani@promactinfo.com",
            name: "Jay Godhani",
            role: "client",
            __v: 0,
          },
        ],
        createdAt: "2024-04-16T10:18:18.372Z",
        updatedAt: "2024-04-16T10:18:18.372Z",
        __v: 0,
      },
      riskProfiling: [],
      approvedTeam: [],
      resources: [],
      clientFeedback: [],
      projectUpdates: [],
      moms: [],
      versionHistory: [],
      operationalMatrix: [],
      financialMatrix: [],
      technicalMatrix: [],
      phases: [],
      sprints: [],
      createdAt: "2024-04-16T10:18:18.436Z",
      updatedAt: "2024-04-16T10:18:59.364Z",
      __v: 1,
    },
  ];
  const [associatedProjects, setAssociatedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // say, _id of logged in Project Manager is 6611211f607cbbf2243d39b1
  useEffect(() => {
    const loggedInPMId = "6611211f607cbbf2243d39b1";
    const projects = allProjects.filter((project) =>
      Object.values(project.stakeholders)
        .flat()
        .some((stakeholder) => stakeholder._id === loggedInPMId)
    );

    setAssociatedProjects(projects);
    if (projects?.length > 0) setSelectedProject(projects[0]);
    console.log(selectedProject);
    console.log(projects[0]);
  }, []);

  const handleChange = (e) => {
    const projectId = e.target.value;
    setSelectedProject(
      associatedProjects.find((project) => project._id === projectId)
    );
  };

  return (
    <>
      {associatedProjects?.length > 0 ? (
        // <>
        //   {/* Project Metrics Section */}
        //   <div className="project-metrics">
        //     {/* Metrics for all projects */}
        //     <div className="metrics-box">
        //       <h1>{associatedProjects.length}</h1>
        //       <label>all projects</label>
        //     </div>
        //     {/* Metrics for ongoing projects */}
        //     <div className="metrics-box">
        //       <h1>
        //         {
        //           associatedProjects.filter(
        //             (project) => project.status.toLowerCase() === "on-going"
        //           ).length
        //         }
        //       </h1>
        //       <label>on-going</label>
        //     </div>
        //     {/* Metrics for completed projects */}
        //     <div className="metrics-box">
        //       <h1>
        //         {
        //           associatedProjects.filter(
        //             (project) => project.status.toLowerCase() === "completed"
        //           ).length
        //         }
        //       </h1>
        //       <label>completed</label>
        //     </div>
        //     {/* Metrics for projects on hold */}
        //     <div className="metrics-box">
        //       <h1>
        //         {
        //           associatedProjects.filter(
        //             (project) => project.status.toLowerCase() === "hold"
        //           ).length
        //         }
        //       </h1>
        //       <label>hold</label>
        //     </div>
        //   </div>
        //   {/* Render NavigationTab component */}
        //   <NavigationTab
        //     data={associatedProjects} // Pass associated projects as data
        //     setData={setAssociatedProjects} // Pass function to update associated projects
        //   />
        // </>
        <>
          <div className="app">
            <select onChange={handleChange}>
              {associatedProjects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.projectName}
                </option>
              ))}
            </select>
            {selectedProject && <ProjectDetails project={selectedProject} />}
          </div>
        </>
      ) : (
        <div className="projects-placeholder">
          No associated projects found at the moment
        </div>
      )}
    </>
  );
};

export default Home;
