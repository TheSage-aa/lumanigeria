// @ts-nocheck
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import lumaLogo from "@/assets/luma-logo-light.png";
import { useLang } from "@/lib/i18n";
import guide1 from "@/assets/guides/LUMA_Guide1_HIV_Basics.pdf";
import guide2 from "@/assets/guides/LUMA_Guide2_PrEP_and_Prevention.pdf";
import guide3 from "@/assets/guides/LUMA_Guide3_Testing_and_Treatment.pdf";
import guide4 from "@/assets/guides/LUMA_Guide4_Your_Rights_on_Campus.pdf";
import guide5 from "@/assets/guides/LUMA_Guide5_Mental_Health_and_HIV.pdf";
import guide6 from "@/assets/guides/LUMA_Guide6_For_Allies.pdf";

export const GUIDES = {
  "hiv-basics": {
    asset: guide1,
    filename: "LUMA_Guide1_HIV_Basics.pdf",
    title: "HIV Basics",
    titleFr: "Bases du VIH",
    body: "What HIV is, how it works, and what it absolutely does not do. Plain language, no jargon.",
    bodyFr:
      "Ce qu'est le VIH, comment il agit, et ce qu'il ne fait absolument pas. Langage clair, sans jargon.",
  },
  "prep-prevention": {
    asset: guide2,
    filename: "LUMA_Guide2_PrEP_and_Prevention.pdf",
    title: "PrEP and Prevention",
    titleFr: "PrEP et Prévention",
    body: "What PrEP is, how to access it in Nigeria, and why every student should know about it.",
    bodyFr:
      "Ce qu'est la PrEP, comment y accéder au Nigéria, et pourquoi chaque étudiant devrait la connaître.",
  },
  "testing-treatment": {
    asset: guide3,
    filename: "LUMA_Guide3_Testing_and_Treatment.pdf",
    title: "Testing and Treatment",
    titleFr: "Dépistage et Traitement",
    body: "Where to get tested, what treatment looks like, and what undetectable means for your life.",
    bodyFr:
      "Où se faire dépister, à quoi ressemble le traitement, et ce que signifie être indétectable.",
  },
  "your-rights": {
    asset: guide4,
    filename: "LUMA_Guide4_Your_Rights_on_Campus.pdf",
    title: "Your Rights on Campus",
    titleFr: "Vos droits sur le campus",
    body: "Anti-discrimination law, medical confidentiality, and what your university legally owes you.",
    bodyFr:
      "Loi anti-discrimination, confidentialité médicale, et ce que votre université vous doit légalement.",
  },
  "mental-health": {
    asset: guide5,
    filename: "LUMA_Guide5_Mental_Health_and_HIV.pdf",
    title: "Mental Health and HIV",
    titleFr: "Santé mentale et VIH",
    body: "Resources for students navigating the emotional weight of an HIV diagnosis on campus.",
    bodyFr:
      "Ressources pour les étudiants confrontés au poids émotionnel d'un diagnostic VIH sur le campus.",
  },
  "for-allies": {
    asset: guide6,
    filename: "LUMA_Guide6_For_Allies.pdf",
    title: "For Allies",
    titleFr: "Pour les alliés",
    body: "How non-positive students can actively support, advocate, and break stigma on their campuses.",
    bodyFr:
      "Comment les étudiants séronégatifs peuvent soutenir, défendre et briser la stigmatisation.",
  },
};

// ─── EMAIL / FORM DELIVERY ────────────────────────────────────────────────────
// All submissions are sent silently via formsubmit.co AJAX to luma.nigeria@gmail.com.
// (One-time confirm: open the first "FormSubmit" email in the inbox or spam folder
// and click Confirm. After that every submission lands silently in the inbox.)
export const LUMA_EMAIL = "luma.nigeria@gmail.com";

export const submitToEmail = async (formType, data) => {
  // Store in the site's own database too, independent of the email path below.
  fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType, data }),
  }).catch((e) => console.error("LUMA submission storage failed", e));

  try {
    const payload = {
      _subject: `[LUMA Website] ${formType}`,
      _template: "table",
      _captcha: "false",
      "Form Type": formType,
      "Submitted At": new Date().toLocaleString(),
      ...Object.fromEntries(
        Object.entries(data).filter(
          ([, v]) => v !== undefined && v !== null && String(v).trim() !== "",
        ),
      ),
    };
    const res = await fetch(`https://formsubmit.co/ajax/${LUMA_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`formsubmit ${res.status}`);
    return true;
  } catch (e) {
    console.error("LUMA submit failed", e);
    // Last-resort fallback: open user's mail app pre-filled.
    try {
      const subject = `[LUMA Website] ${formType}`;
      const body = [
        `Form: ${formType}`,
        `Submitted: ${new Date().toLocaleString()}`,
        "",
        ...Object.entries(data)
          .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
          .map(([k, v]) => `${k}: ${v}`),
      ].join("\n");
      window.location.href = `mailto:${LUMA_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } catch {
      // mailto navigation unsupported
    }
    return true;
  }
};

// ─── STORY DATA ───────────────────────────────────────────────────────────────

export const STORIES = [
  {
    id: "classroom-myth",
    tag: "MYTH vs FACT",
    tagFr: "MYTHE vs RÉALITÉ",
    title: "You cannot get HIV from sharing a classroom. Here is what the research says.",
    titleFr:
      "On ne peut pas contracter le VIH en partageant une salle de classe. Voici ce que dit la recherche.",
    excerpt:
      "A common misconception on Nigerian campuses is that casual contact can transmit HIV. We break down exactly how HIV does and does not spread, using data from Nigerian university studies.",
    excerptFr:
      "Une idée reçue répandue sur les campus nigérians veut que le contact occasionnel puisse transmettre le VIH. Nous expliquons précisément comment le VIH se transmet et ne se transmet pas, en nous appuyant sur des données d'études universitaires nigérianes.",
    date: "June 2026",
    readTime: "5 min read",
    content: [
      {
        type: "lead",
        text: "One of the most persistent myths circulating in Nigerian universities is that you can contract HIV through everyday contact with someone who is HIV positive. Sharing a lecture hall, a hostel bathroom, or a plate of food does not put you at risk. Not even close. And yet this myth continues to shape how students treat their peers.",
        textFr:
          "L'un des mythes les plus persistants dans les universités nigérianes est qu'on peut contracter le VIH par un contact quotidien avec une personne séropositive. Partager un amphithéâtre, une salle de bain d'internat ou une assiette de nourriture ne présente aucun risque. Absolument aucun. Et pourtant, ce mythe continue de façonner la façon dont les étudiants traitent leurs pairs.",
      },
      { type: "heading", text: "How HIV is actually transmitted", textFr: "Comment le VIH se transmet réellement" },
      {
        type: "body",
        text: "HIV is transmitted through specific bodily fluids: blood, semen, vaginal and rectal fluids, breast milk, and pre-seminal fluid. It is not transmitted through saliva, tears, sweat, air, water, insect bites, or skin contact. You cannot get HIV from a handshake, a hug, sharing food, or sitting beside someone in a class.",
        textFr:
          "Le VIH se transmet par des fluides corporels spécifiques : le sang, le sperme, les sécrétions vaginales et rectales, le lait maternel et le liquide pré-séminal. Il ne se transmet pas par la salive, les larmes, la sueur, l'air, l'eau, les piqûres d'insectes ou le contact cutané. On ne peut pas contracter le VIH par une poignée de main, une accolade, le partage d'un repas ou le fait de s'asseoir à côté de quelqu'un en cours.",
      },
      {
        type: "body",
        text: "The 2018 study at Ebonyi State University, the only campus-specific HIV data available from Nigerian universities, found a prevalence rate of just 0.22% among newly admitted students. If casual contact transmitted HIV, we would see a very different picture on campuses where students share everything from hostels to lecture notes.",
        textFr:
          "L'étude de 2018 menée à l'Université d'État d'Ebonyi, la seule donnée sur le VIH spécifique à un campus disponible pour les universités nigérianes, a révélé un taux de prévalence de seulement 0,22 % chez les nouveaux admis. Si le contact occasionnel transmettait le VIH, la situation serait très différente sur des campus où les étudiants partagent tout, des internats aux notes de cours.",
      },
      { type: "heading", text: "Where the myth comes from", textFr: "D'où vient ce mythe" },
      {
        type: "body",
        text: "HIV stigma in Nigeria has deep roots in early public health messaging from the 1980s and 1990s, when the science of transmission was not fully understood. Much of that fear stuck even as the science moved forward. A 2017 review of HIV stigma in Nigeria found that misconceptions about transmission are one of the primary drivers of discriminatory behaviour toward people living with HIV.",
        textFr:
          "La stigmatisation du VIH au Nigéria a des racines profondes dans les premiers messages de santé publique des années 1980 et 1990, à une époque où la science de la transmission n'était pas encore bien comprise. Une grande partie de cette peur a persisté même après les avancées scientifiques. Une revue de 2017 sur la stigmatisation du VIH au Nigéria a révélé que les idées fausses sur la transmission sont l'un des principaux moteurs des comportements discriminatoires envers les personnes vivant avec le VIH.",
      },
      {
        type: "body",
        text: "On Nigerian campuses specifically, these myths spread through informal peer conversations, religious communities, and social media content that has never been fact-checked. By the time a student arrives at university, they may have been carrying incorrect beliefs for years.",
        textFr:
          "Sur les campus nigérians en particulier, ces mythes se propagent à travers des conversations informelles entre pairs, des communautés religieuses et du contenu sur les réseaux sociaux jamais vérifié. Au moment où un étudiant arrive à l'université, il peut porter ces croyances erronées depuis des années.",
      },
      {
        type: "heading",
        text: "What the knowledge-attitude paradox tells us",
        textFr: "Ce que le paradoxe connaissance-attitude nous apprend",
      },
      {
        type: "body",
        text: "Research consistently shows what we call a knowledge-attitude paradox: students can score high on HIV knowledge tests and still hold deeply stigmatising attitudes toward their HIV positive peers. A 2024 study of university students found that 96.85% demonstrated high AIDS knowledge, yet only 55.52% had positive attitudes toward people living with HIV. Knowing the facts is not enough to change behaviour. That is why LUMA exists.",
        textFr:
          "La recherche montre systématiquement ce que nous appelons un paradoxe connaissance-attitude : des étudiants peuvent obtenir d'excellents résultats aux tests de connaissance sur le VIH tout en conservant des attitudes profondément stigmatisantes envers leurs pairs séropositifs. Une étude de 2024 sur des étudiants universitaires a révélé que 96,85 % avaient un niveau de connaissance élevé sur le sida, mais que seulement 55,52 % avaient des attitudes positives envers les personnes vivant avec le VIH. Connaître les faits ne suffit pas à changer les comportements. C'est pour cela que LUMA existe.",
      },
      {
        type: "callout",
        text: "HIV is not transmitted through the air, water, food, casual contact, insect bites, or shared facilities. It is transmitted through specific bodily fluids during specific activities. Full stop.",
        textFr:
          "Le VIH ne se transmet pas par l'air, l'eau, la nourriture, le contact occasionnel, les piqûres d'insectes ou les installations partagées. Il se transmet par des fluides corporels spécifiques lors d'activités spécifiques. Point final.",
      },
      {
        type: "body",
        text: "If someone at your university is living with HIV, sharing a classroom with them carries no risk whatsoever. What does carry risk is the stigma that makes them feel unsafe, unseen, and unsupported in that classroom. That is the real problem LUMA is here to address.",
        textFr:
          "Si une personne de votre université vit avec le VIH, partager une salle de classe avec elle ne présente absolument aucun risque. Ce qui présente un risque, c'est la stigmatisation qui la fait se sentir en danger, invisible et sans soutien dans cette salle. C'est le vrai problème que LUMA est venue résoudre.",
      },
    ],
    related: ["prep-explained", "stigma-data", "your-rights"],
  },
  {
    id: "prep-explained",
    tag: "RESEARCH",
    tagFr: "RECHERCHE",
    title: "What is PrEP and why does no one at your campus health centre mention it?",
    titleFr:
      "Qu'est-ce que la PrEP et pourquoi personne au centre de santé de votre campus n'en parle ?",
    excerpt:
      "Pre-Exposure Prophylaxis is one of the most effective HIV prevention tools available. Yet PrEP awareness at Nigerian universities remains critically low. Our KWASU research tells the full story.",
    excerptFr:
      "La prophylaxie pré-exposition est l'un des outils de prévention du VIH les plus efficaces qui existent. Pourtant, la connaissance de la PrEP dans les universités nigérianes reste extrêmement faible. Notre recherche à la KWASU raconte toute l'histoire.",
    date: "June 2026",
    readTime: "7 min read",
    content: [
      {
        type: "lead",
        text: "Pre-Exposure Prophylaxis, known as PrEP, is a daily medication that reduces the risk of contracting HIV through sex by up to 99% when taken consistently. It has been available in Nigeria since 2017. And yet, if you asked students at your campus health centre about it, the chances are very high that they would not know what you were talking about.",
        textFr:
          "La prophylaxie pré-exposition, ou PrEP, est un médicament quotidien qui réduit le risque de contracter le VIH par voie sexuelle jusqu'à 99 % lorsqu'il est pris régulièrement. Elle est disponible au Nigéria depuis 2017. Et pourtant, si vous en parliez au personnel du centre de santé de votre campus, il y a de fortes chances qu'il ne sache pas de quoi vous parlez.",
      },
      { type: "heading", text: "What PrEP actually is", textFr: "Ce qu'est réellement la PrEP" },
      {
        type: "body",
        text: "PrEP is not a treatment for HIV. It is a prevention tool for people who do not have HIV but may be at risk. It works by keeping the virus from establishing itself in the body if you are exposed. The most common form is a daily pill called Tenofovir/Emtricitabine (brand name Truvada), though long-acting injectable forms are now also available in some settings.",
        textFr:
          "La PrEP n'est pas un traitement contre le VIH. C'est un outil de prévention pour les personnes qui ne vivent pas avec le VIH mais qui peuvent être exposées à un risque. Elle empêche le virus de s'installer dans l'organisme en cas d'exposition. La forme la plus courante est un comprimé quotidien appelé Ténofovir/Emtricitabine (nom commercial Truvada), bien que des formes injectables à action prolongée soient désormais disponibles dans certains contextes.",
      },
      {
        type: "body",
        text: "PrEP is recommended for people who are HIV negative but have a partner living with HIV, people who do not consistently use condoms, and anyone who wants an additional layer of protection. It is safe, effective, and increasingly accessible in Nigeria through public health facilities.",
        textFr:
          "La PrEP est recommandée aux personnes séronégatives dont le partenaire vit avec le VIH, à celles qui n'utilisent pas systématiquement de préservatif, et à toute personne souhaitant une protection supplémentaire. Elle est sûre, efficace et de plus en plus accessible au Nigéria via les établissements de santé publique.",
      },
      { type: "heading", text: "What LUMA's research found at KWASU", textFr: "Ce que la recherche de LUMA a révélé à la KWASU" },
      {
        type: "body",
        text: "LUMA's ongoing research on PrEP awareness at Kwara State University is revealing a significant awareness gap. Preliminary findings suggest that the majority of students surveyed had never heard of PrEP, and fewer still knew how to access it through the university's health centre or nearby public facilities. This is not unique to KWASU. It reflects a national pattern.",
        textFr:
          "La recherche en cours menée par LUMA sur la connaissance de la PrEP à l'Université d'État de Kwara révèle un écart de connaissance important. Les résultats préliminaires suggèrent que la majorité des étudiants interrogés n'avaient jamais entendu parler de la PrEP, et encore moins savaient comment y accéder via le centre de santé de l'université ou les établissements publics à proximité. Cela ne se limite pas à la KWASU. Cela reflète une tendance nationale.",
      },
      {
        type: "body",
        text: "PEPFAR data from before the 2025 funding cuts showed that 742,000 people across 28 African countries were on PEPFAR-funded PrEP. Following the cuts, an estimated 719,000 of those people lost access. Nigeria was one of the five countries most severely affected. This crisis makes campus-level PrEP awareness more critical, not less.",
        textFr:
          "Les données du PEPFAR d'avant les coupes budgétaires de 2025 montraient que 742 000 personnes dans 28 pays africains bénéficiaient de la PrEP financée par le PEPFAR. Après ces coupes, on estime que 719 000 de ces personnes ont perdu l'accès. Le Nigéria a été l'un des cinq pays les plus durement touchés. Cette crise rend la sensibilisation à la PrEP sur les campus encore plus essentielle, pas moins.",
      },
      { type: "heading", text: "Why campus health centres stay silent", textFr: "Pourquoi les centres de santé des campus restent silencieux" },
      {
        type: "body",
        text: "Campus health centres in Nigeria were not designed around sexual health. They were designed around malaria treatment, minor injury care, and routine checkups. HIV prevention, including PrEP, was never part of their original mandate. Without specific training for campus health staff, PrEP remains invisible in campus health conversations.",
        textFr:
          "Les centres de santé des campus au Nigéria n'ont pas été conçus autour de la santé sexuelle. Ils ont été conçus pour le traitement du paludisme, les soins de blessures mineures et les bilans de routine. La prévention du VIH, y compris la PrEP, n'a jamais fait partie de leur mission d'origine. Sans formation spécifique du personnel de santé des campus, la PrEP reste invisible dans les discussions sur la santé du campus.",
      },
      {
        type: "callout",
        text: "PrEP reduces the risk of getting HIV from sex by up to 99% when taken consistently. It is available in Nigeria. Your campus health centre probably has not told you this.",
        textFr:
          "La PrEP réduit le risque de contracter le VIH par voie sexuelle jusqu'à 99 % lorsqu'elle est prise régulièrement. Elle est disponible au Nigéria. Le centre de santé de votre campus ne vous l'a probablement jamais dit.",
      },
      {
        type: "body",
        text: "This is one of LUMA's core advocacy targets: pushing Nigerian universities to train campus health staff on PrEP, integrate it into campus sexual health conversations, and make clear referral pathways available to any student who needs it.",
        textFr:
          "C'est l'un des principaux objectifs de plaidoyer de LUMA : pousser les universités nigérianes à former leur personnel de santé sur la PrEP, l'intégrer aux discussions sur la santé sexuelle du campus, et mettre en place des filières d'orientation claires pour tout étudiant qui en a besoin.",
      },
      { type: "heading", text: "How to access PrEP in Nigeria right now", textFr: "Comment accéder à la PrEP au Nigéria dès maintenant" },
      {
        type: "body",
        text: "Visit a public health facility near your university and ask specifically about PrEP. Many facilities receive PrEP through government programmes and it is available at low or no cost. You will need an HIV test first to confirm you are negative. After that, PrEP is prescribed and dispensed with follow-up appointments every three months. You do not need a referral. You can walk in and ask.",
        textFr:
          "Rendez-vous dans un établissement de santé publique près de votre université et demandez spécifiquement la PrEP. De nombreux établissements reçoivent la PrEP via des programmes gouvernementaux, et elle est disponible à faible coût, voire gratuitement. Vous devrez d'abord passer un test de dépistage du VIH pour confirmer que vous êtes séronégatif. Ensuite, la PrEP est prescrite et délivrée avec des rendez-vous de suivi tous les trois mois. Aucune orientation n'est nécessaire. Vous pouvez vous présenter directement et demander.",
      },
    ],
    related: ["classroom-myth", "stigma-data", "uequals-u"],
  },
  {
    id: "stigma-data",
    tag: "DATA",
    tagFr: "DONNÉES",
    title: "HIV stigma at Nigerian universities: what our data found and why it matters.",
    titleFr:
      "La stigmatisation du VIH dans les universités nigérianes : ce que nos données révèlent et pourquoi c'est important.",
    excerpt:
      "Our ongoing research across APYIN branches reveals a knowledge-attitude paradox: 96.85% of students know the facts about HIV, yet only 55.5% hold non-stigmatising attitudes toward PLHIV.",
    excerptFr:
      "Notre recherche en cours dans les antennes de l'APYIN révèle un paradoxe connaissance-attitude : 96,85 % des étudiants connaissent les faits sur le VIH, mais seulement 55,5 % ont des attitudes non stigmatisantes envers les PVVIH.",
    date: "June 2026",
    readTime: "6 min read",
    content: [
      {
        type: "lead",
        text: "The numbers are striking. Nearly every university student surveyed knows that HIV is not transmitted through casual contact. They know you cannot get it from sharing a classroom or a meal. And yet over 40% of those same students would be uncomfortable sitting beside someone they knew was HIV positive. This is the knowledge-attitude paradox, and it is at the heart of everything LUMA is trying to change.",
        textFr:
          "Les chiffres sont frappants. Presque tous les étudiants interrogés savent que le VIH ne se transmet pas par contact occasionnel. Ils savent qu'on ne peut pas le contracter en partageant une salle de classe ou un repas. Et pourtant, plus de 40 % de ces mêmes étudiants seraient mal à l'aise de s'asseoir à côté d'une personne séropositive. C'est le paradoxe connaissance-attitude, et c'est au cœur de tout ce que LUMA essaie de changer.",
      },
      { type: "heading", text: "What the research shows", textFr: "Ce que montre la recherche" },
      {
        type: "body",
        text: "LUMA's ongoing study on HIV stigma and mental health across APYIN branches is building on a growing body of evidence. A 2024 study of university students found that 96.85% demonstrated high AIDS knowledge. Yet only 55.52% had positive attitudes toward people living with HIV. The gap between knowing and acting with dignity is enormous.",
        textFr:
          "L'étude en cours de LUMA sur la stigmatisation du VIH et la santé mentale dans les antennes de l'APYIN s'appuie sur un corpus de preuves grandissant. Une étude de 2024 sur des étudiants universitaires a révélé que 96,85 % avaient un niveau de connaissance élevé sur le sida. Pourtant, seulement 55,52 % avaient des attitudes positives envers les personnes vivant avec le VIH. L'écart entre savoir et agir avec dignité est immense.",
      },
      {
        type: "body",
        text: "Specific stigma indicators from university student research include: 59.8% were unwilling to have contact with people living with HIV; 58.9% were uncomfortable eating at the same table; 60% were not willing to buy food from someone living with HIV; and 43.5% were uncomfortable shaking hands. These are not abstract statistics. These are the daily experiences of your classmates.",
        textFr:
          "Les indicateurs de stigmatisation spécifiques issus de la recherche auprès des étudiants universitaires incluent : 59,8 % refusaient tout contact avec des personnes vivant avec le VIH ; 58,9 % étaient mal à l'aise à l'idée de manger à la même table ; 60 % ne voulaient pas acheter de nourriture auprès d'une personne séropositive ; et 43,5 % étaient mal à l'aise à l'idée de lui serrer la main. Ce ne sont pas des statistiques abstraites. Ce sont le quotidien de vos camarades de classe.",
      },
      { type: "heading", text: "What stigma does to mental health", textFr: "Ce que la stigmatisation fait à la santé mentale" },
      {
        type: "body",
        text: "HIV-related stigma has direct, measurable consequences for mental health. For a university student already navigating the pressures of academic life, the additional burden of managing a stigmatised identity is significant. Research consistently links HIV stigma to higher rates of depression, anxiety, social withdrawal, and poorer treatment adherence among young people living with HIV.",
        textFr:
          "La stigmatisation liée au VIH a des conséquences directes et mesurables sur la santé mentale. Pour un étudiant universitaire déjà confronté aux pressions de la vie académique, le fardeau supplémentaire de gérer une identité stigmatisée est considérable. La recherche établit systématiquement un lien entre la stigmatisation du VIH et des taux plus élevés de dépression, d'anxiété, de retrait social et une moins bonne observance du traitement chez les jeunes vivant avec le VIH.",
      },
      {
        type: "body",
        text: "A 2021 Nigerian study found that only half of people living with HIV received sufficient support from family, friends, and significant others. On university campuses, where peer relationships are central to wellbeing, this isolation is particularly damaging.",
        textFr:
          "Une étude nigériane de 2021 a révélé que seule la moitié des personnes vivant avec le VIH recevaient un soutien suffisant de leur famille, de leurs amis et de leurs proches. Sur les campus universitaires, où les relations entre pairs sont essentielles au bien-être, cet isolement est particulièrement néfaste.",
      },
      { type: "heading", text: "Why knowledge alone is not enough", textFr: "Pourquoi la connaissance seule ne suffit pas" },
      {
        type: "body",
        text: "The knowledge-attitude paradox tells us something important: HIV education as it is currently delivered in Nigeria is not working. Telling people the facts about transmission does not automatically change how they feel about or treat their HIV positive peers. Stigma is a social phenomenon. It requires social solutions.",
        textFr:
          "Le paradoxe connaissance-attitude nous apprend quelque chose d'important : l'éducation sur le VIH telle qu'elle est actuellement dispensée au Nigéria ne fonctionne pas. Dire aux gens les faits sur la transmission ne change pas automatiquement leur ressenti ou leur comportement envers leurs pairs séropositifs. La stigmatisation est un phénomène social. Elle nécessite des solutions sociales.",
      },
      {
        type: "callout",
        text: "Knowing the facts about HIV is not the same as treating HIV positive people with dignity. LUMA exists in that gap.",
        textFr:
          "Connaître les faits sur le VIH n'est pas la même chose que de traiter les personnes séropositives avec dignité. LUMA existe précisément dans cet écart.",
      },
      {
        type: "body",
        text: "This is why LUMA's approach centres advocacy and community, not just information. The status neutral approach, which removes the separation between HIV positive and negative in how we deliver education and services, is specifically designed to address the social roots of stigma rather than just its informational causes.",
        textFr:
          "C'est pourquoi l'approche de LUMA place le plaidoyer et la communauté au centre, pas seulement l'information. L'approche « statut neutre », qui supprime la séparation entre séropositif et séronégatif dans la façon dont nous délivrons l'éducation et les services, est spécifiquement conçue pour s'attaquer aux racines sociales de la stigmatisation, et non seulement à ses causes informationnelles.",
      },
    ],
    related: ["classroom-myth", "your-rights", "first-year-diagnosis"],
  },
  {
    id: "your-rights",
    tag: "RIGHTS",
    tagFr: "DROITS",
    title: "As an HIV positive student, you have rights on campus. Here is what they are.",
    titleFr: "En tant qu'étudiant séropositif, vous avez des droits sur le campus. Voici lesquels.",
    excerpt:
      "From medical confidentiality to anti-discrimination protections, many Nigerian university students living with HIV do not know their legal rights. This post changes that.",
    excerptFr:
      "De la confidentialité médicale aux protections contre la discrimination, de nombreux étudiants nigérians vivant avec le VIH ignorent leurs droits légaux. Cet article change la donne.",
    date: "June 2026",
    readTime: "8 min read",
    content: [
      {
        type: "lead",
        text: "If you are a university student living with HIV in Nigeria, you have legal rights. Your HIV status is protected health information. You cannot be expelled, suspended, or discriminated against on the basis of your HIV status. You are entitled to reasonable accommodations if your health requires them. Most students living with HIV in Nigerian universities do not know any of this. That is a problem LUMA is determined to fix.",
        textFr:
          "Si vous êtes un étudiant universitaire vivant avec le VIH au Nigéria, vous avez des droits légaux. Votre statut sérologique est une information de santé protégée. Vous ne pouvez pas être exclu, suspendu ou discriminé en raison de votre statut. Vous avez droit à des aménagements raisonnables si votre santé l'exige. La plupart des étudiants vivant avec le VIH dans les universités nigérianes ne savent rien de tout cela. C'est un problème que LUMA est déterminée à résoudre.",
      },
      { type: "heading", text: "The HIV and AIDS Anti-Discrimination Act", textFr: "La loi anti-discrimination sur le VIH et le sida" },
      {
        type: "body",
        text: "Nigeria's HIV and AIDS Anti-Discrimination Act of 2014 is clear: no person shall be denied access to education on the grounds of their actual or perceived HIV status. This means a university cannot expel you, refuse your admission, or remove you from a programme because you are living with HIV. Any such action is unlawful.",
        textFr:
          "La loi nigériane de 2014 sur l'anti-discrimination liée au VIH et au sida est claire : nul ne peut se voir refuser l'accès à l'éducation en raison de son statut sérologique réel ou perçu. Cela signifie qu'une université ne peut pas vous exclure, refuser votre admission ou vous retirer d'un programme parce que vous vivez avec le VIH. Une telle action est illégale.",
      },
      {
        type: "body",
        text: "The Act also protects your right to privacy. Your HIV status is protected health information. No one at your university, including lecturers, hall wardens, or health centre staff, has the right to disclose your HIV status to other students, staff, or the public without your explicit consent.",
        textFr:
          "La loi protège également votre droit à la vie privée. Votre statut sérologique est une information de santé protégée. Personne dans votre université, y compris les enseignants, les surveillants d'internat ou le personnel du centre de santé, n'a le droit de divulguer votre statut à d'autres étudiants, au personnel ou au public sans votre consentement explicite.",
      },
      { type: "heading", text: "Medical confidentiality on campus", textFr: "La confidentialité médicale sur le campus" },
      {
        type: "body",
        text: "When you access health services at your university health centre, your records are confidential. This includes HIV testing, treatment, and counselling. Staff at the health centre are bound by professional confidentiality obligations. If your status is ever disclosed without your consent, this is a violation of both your legal rights and professional ethics standards.",
        textFr:
          "Lorsque vous accédez aux services de santé du centre médical de votre université, vos dossiers sont confidentiels. Cela inclut le dépistage, le traitement et le conseil liés au VIH. Le personnel du centre de santé est tenu par des obligations de confidentialité professionnelle. Si votre statut est divulgué sans votre consentement, il s'agit d'une violation à la fois de vos droits légaux et des normes déontologiques.",
      },
      {
        type: "body",
        text: "In practice, we know confidentiality is not always maintained. Informal disclosure happens. If you experience a breach of confidentiality at your university, document it. Write down what happened, when, and who was involved. This creates a record you can use to make a formal complaint.",
        textFr:
          "Dans la pratique, nous savons que la confidentialité n'est pas toujours respectée. Des divulgations informelles se produisent. Si vous êtes victime d'une atteinte à la confidentialité dans votre université, documentez-la. Notez ce qui s'est passé, quand, et qui était impliqué. Cela constitue une preuve que vous pourrez utiliser pour déposer une plainte formelle.",
      },
      { type: "heading", text: "What your university should provide", textFr: "Ce que votre université doit fournir" },
      {
        type: "body",
        text: "Under Nigeria's 2026 to 2030 National HIV Prevention Plan, universities are expected to provide HIV testing and counselling services, referral pathways to treatment, and support for students living with HIV. In practice, most Nigerian universities do not yet meet this standard. This is the gap LUMA's advocacy work is targeting.",
        textFr:
          "Dans le cadre du Plan national de prévention du VIH du Nigéria 2026-2030, les universités sont censées fournir des services de dépistage et de conseil, des filières d'orientation vers le traitement, et un soutien aux étudiants vivant avec le VIH. Dans la pratique, la plupart des universités nigérianes n'atteignent pas encore ce niveau. C'est l'écart que le travail de plaidoyer de LUMA vise à combler.",
      },
      {
        type: "callout",
        text: "You cannot be expelled from a Nigerian university because you are living with HIV. Your medical records are confidential. These are not requests. They are rights.",
        textFr:
          "Vous ne pouvez pas être exclu d'une université nigériane parce que vous vivez avec le VIH. Vos dossiers médicaux sont confidentiels. Ce ne sont pas des faveurs. Ce sont des droits.",
      },
      {
        type: "body",
        text: "If you are experiencing discrimination at your university based on your HIV status, reach out to LUMA through our anonymous contact option. We can help you understand your options and connect you with support.",
        textFr:
          "Si vous subissez une discrimination dans votre université en raison de votre statut sérologique, contactez LUMA via notre option de contact anonyme. Nous pouvons vous aider à comprendre vos options et vous mettre en relation avec du soutien.",
      },
    ],
    related: ["stigma-data", "first-year-diagnosis", "prep-explained"],
  },
  {
    id: "first-year-diagnosis",
    tag: "MENTAL HEALTH",
    tagFr: "SANTÉ MENTALE",
    title: "Navigating a new HIV diagnosis in your first year of university.",
    titleFr: "Traverser un nouveau diagnostic VIH en première année d'université.",
    excerpt:
      "Receiving a diagnosis during the high-pressure environment of early university life is uniquely challenging. This piece, written with LUMA community members, maps what that journey can look like.",
    excerptFr:
      "Recevoir un diagnostic dans l'environnement à forte pression des débuts de la vie universitaire est un défi unique. Cet article, écrit avec des membres de la communauté LUMA, décrit à quoi ce parcours peut ressembler.",
    date: "June 2026",
    readTime: "9 min read",
    content: [
      {
        type: "lead",
        text: "This piece was written with members of the LUMA community who received their HIV diagnosis during university. Their experiences are their own. We share them here with gratitude and with their permission. If you are currently navigating a new diagnosis, this is for you.",
        textFr:
          "Cet article a été écrit avec des membres de la communauté LUMA qui ont reçu leur diagnostic VIH pendant leurs études universitaires. Leurs expériences leur appartiennent. Nous les partageons ici avec gratitude et avec leur permission. Si vous traversez actuellement un nouveau diagnostic, cet article est pour vous.",
      },
      { type: "heading", text: "The first weeks", textFr: "Les premières semaines" },
      {
        type: "body",
        text: "The weeks following an HIV diagnosis are often described in similar ways regardless of where or when they happen: shock, fear, isolation, and an overwhelming sense that everything has changed. For a first-year student, this arrives on top of already intense transitions. A new city. A new academic environment. A new social world. A new identity to build.",
        textFr:
          "Les semaines suivant un diagnostic VIH sont souvent décrites de façon similaire, quel que soit le contexte : choc, peur, isolement, et un sentiment accablant que tout a changé. Pour un étudiant de première année, cela s'ajoute à des transitions déjà intenses. Une nouvelle ville. Un nouvel environnement académique. Un nouveau monde social. Une nouvelle identité à construire.",
      },
      {
        type: "body",
        text: "Many students describe a period of complete withdrawal in the immediate aftermath of a diagnosis. Skipping lectures. Avoiding friends. Spending days in the hostel room. This is an understandable response to overwhelming news. It is not permanent. And it does not mean you are not going to be okay.",
        textFr:
          "Beaucoup d'étudiants décrivent une période de repli complet juste après le diagnostic. Sécher les cours. Éviter les amis. Passer des journées entières dans la chambre d'internat. C'est une réaction compréhensible face à une nouvelle bouleversante. Ce n'est pas permanent. Et cela ne signifie pas que tout n'ira pas bien.",
      },
      { type: "heading", text: "What actually helps", textFr: "Ce qui aide vraiment" },
      {
        type: "body",
        text: "Getting into treatment quickly matters, not just for your physical health but for your mental health too. Starting antiretroviral therapy (ART) and seeing your viral load begin to drop gives many people a sense of agency that reduces the psychological weight of a diagnosis. Treatment works. And treatment in Nigeria is more accessible than most students realise.",
        textFr:
          "Commencer rapidement un traitement compte, pas seulement pour votre santé physique mais aussi pour votre santé mentale. Débuter la thérapie antirétrovirale (ARV) et voir sa charge virale commencer à baisser donne à beaucoup de gens un sentiment de contrôle qui allège le poids psychologique du diagnostic. Le traitement fonctionne. Et le traitement au Nigéria est plus accessible que la plupart des étudiants ne le pensent.",
      },
      {
        type: "body",
        text: "Community matters equally. Connecting with even one other person who understands what you are navigating changes the experience significantly. The Peer Circle exists specifically for this. You do not need to process this alone. You were never supposed to.",
        textFr:
          "La communauté compte tout autant. Se connecter à ne serait-ce qu'une seule autre personne qui comprend ce que vous traversez change considérablement l'expérience. Le Cercle des Pairs existe précisément pour cela. Vous n'avez pas à traverser cela seul. Vous n'étiez jamais censé le faire.",
      },
      { type: "heading", text: "Managing your academic life", textFr: "Gérer votre vie académique" },
      {
        type: "body",
        text: "You do not have to disclose your HIV status to access academic support. If your health is affecting your studies, you can speak to your academic adviser or student welfare office about a medical situation without specifying what it is. Universities generally have provisions for students experiencing health challenges. Ask about deferral options, extensions, and welfare support.",
        textFr:
          "Vous n'êtes pas obligé de divulguer votre statut sérologique pour accéder à un soutien académique. Si votre santé affecte vos études, vous pouvez parler à votre conseiller académique ou au bureau des affaires étudiantes d'une situation médicale sans en préciser la nature. Les universités disposent généralement de dispositifs pour les étudiants confrontés à des problèmes de santé. Renseignez-vous sur les reports, les prolongations et le soutien social.",
      },
      {
        type: "callout",
        text: "A diagnosis is information about your health. It is not a verdict on your future. Students living with HIV graduate. They build careers. They have relationships. They live full lives. This is not the exception. It is the rule.",
        textFr:
          "Un diagnostic est une information sur votre santé. Ce n'est pas un verdict sur votre avenir. Les étudiants vivant avec le VIH obtiennent leur diplôme. Ils construisent des carrières. Ils vivent des relations. Ils mènent une vie pleine. Ce n'est pas l'exception. C'est la règle.",
      },
      {
        type: "body",
        text: "If you received your HIV diagnosis recently and you are a university student in Nigeria, please consider joining The Peer Circle. You do not need to share your name. You do not need to share your story. You just need to know there is a room full of people who understand. There is.",
        textFr:
          "Si vous avez récemment reçu votre diagnostic VIH et que vous êtes étudiant au Nigéria, envisagez de rejoindre Le Cercle des Pairs. Vous n'avez pas besoin de donner votre nom. Vous n'avez pas besoin de raconter votre histoire. Vous avez juste besoin de savoir qu'il existe un espace rempli de personnes qui comprennent. Il existe.",
      },
    ],
    related: ["your-rights", "stigma-data", "uequals-u"],
  },
  {
    id: "uequals-u",
    tag: "PREVENTION",
    tagFr: "PRÉVENTION",
    title: "U=U: What Undetectable equals Untransmittable means for you and your campus.",
    titleFr: "I=I : Ce qu'Indétectable égale Intransmissible signifie pour vous et votre campus.",
    excerpt:
      "The U=U science is settled. But awareness among Nigerian students is almost zero. We explain what this means, why it matters, and how it changes the conversation around HIV on campus.",
    excerptFr:
      "La science derrière I=I est établie. Mais la connaissance de ce concept chez les étudiants nigérians est quasi nulle. Nous expliquons ce que cela signifie, pourquoi c'est important, et comment cela change la conversation sur le VIH sur le campus.",
    date: "June 2026",
    readTime: "6 min read",
    content: [
      {
        type: "lead",
        text: "U=U stands for Undetectable equals Untransmittable. It is one of the most important advances in HIV science of the past decade. A person living with HIV who is on effective treatment and has achieved an undetectable viral load cannot transmit HIV to a sexual partner. This is settled science, endorsed by the World Health Organization, the CDC, and every major HIV research body in the world. It is not widely known in Nigerian universities.",
        textFr:
          "I=I signifie Indétectable égale Intransmissible. C'est l'une des avancées les plus importantes de la science du VIH de la dernière décennie. Une personne vivant avec le VIH sous traitement efficace et ayant atteint une charge virale indétectable ne peut pas transmettre le VIH à un partenaire sexuel. C'est une science établie, reconnue par l'Organisation mondiale de la santé, le CDC, et tous les grands organismes de recherche sur le VIH dans le monde. Elle reste peu connue dans les universités nigérianes.",
      },
      { type: "heading", text: "What undetectable means", textFr: "Ce que signifie « indétectable »" },
      {
        type: "body",
        text: "When someone living with HIV takes antiretroviral therapy consistently, the medication suppresses the virus to levels that cannot be detected by standard blood tests. This is called an undetectable viral load. It typically takes between three and six months of consistent treatment to achieve, and it is maintained by continuing medication.",
        textFr:
          "Lorsqu'une personne vivant avec le VIH prend régulièrement un traitement antirétroviral, le médicament supprime le virus à des niveaux indétectables par les tests sanguins standards. On parle alors de charge virale indétectable. Cela prend généralement entre trois et six mois de traitement régulier pour y parvenir, et cela se maintient en continuant le traitement.",
      },
      {
        type: "body",
        text: "Large clinical studies, including the landmark PARTNER and Opposites Attract studies, followed thousands of serodiscordant couples (where one partner is HIV positive and one is HIV negative) over years. Across tens of thousands of sex acts between couples where the HIV positive partner had an undetectable viral load, there were zero transmissions. Zero.",
        textFr:
          "De vastes études cliniques, dont les études phares PARTNER et Opposites Attract, ont suivi pendant des années des milliers de couples sérodiscordants (où un partenaire est séropositif et l'autre séronégatif). Sur des dizaines de milliers de rapports sexuels entre couples où le partenaire séropositif avait une charge virale indétectable, il n'y a eu aucune transmission. Zéro.",
      },
      { type: "heading", text: "Why this changes everything", textFr: "Pourquoi cela change tout" },
      {
        type: "body",
        text: "U=U fundamentally changes the conversation about HIV and relationships. A student living with HIV who is on treatment and undetectable poses no risk of transmitting HIV to a partner. This knowledge reduces stigma, because much of the fear around HIV positive people is rooted in fear of transmission. When transmission is not possible, that fear loses its basis.",
        textFr:
          "I=I change fondamentalement la conversation sur le VIH et les relations. Un étudiant vivant avec le VIH, sous traitement et indétectable, ne présente aucun risque de transmettre le VIH à un partenaire. Cette connaissance réduit la stigmatisation, car une grande partie de la peur envers les personnes séropositives est enracinée dans la peur de la transmission. Quand la transmission est impossible, cette peur perd son fondement.",
      },
      {
        type: "body",
        text: "U=U also provides enormous mental health benefits for people living with HIV. The fear of accidentally transmitting HIV to someone you love is one of the most significant psychological burdens of living with HIV. U=U removes that fear entirely for people who are on treatment.",
        textFr:
          "I=I apporte aussi d'énormes bénéfices en santé mentale pour les personnes vivant avec le VIH. La peur de transmettre accidentellement le VIH à une personne qu'on aime est l'un des fardeaux psychologiques les plus lourds de la vie avec le VIH. I=I supprime entièrement cette peur pour les personnes sous traitement.",
      },
      {
        type: "callout",
        text: "A person living with HIV who is on effective treatment and has an undetectable viral load cannot transmit HIV sexually. This is not an opinion. It is settled science endorsed by the WHO.",
        textFr:
          "Une personne vivant avec le VIH sous traitement efficace et ayant une charge virale indétectable ne peut pas transmettre le VIH par voie sexuelle. Ce n'est pas une opinion. C'est une science établie, reconnue par l'OMS.",
      },
      { type: "heading", text: "What needs to change on Nigerian campuses", textFr: "Ce qui doit changer sur les campus nigérians" },
      {
        type: "body",
        text: "U=U awareness among Nigerian university students is very close to zero. This means that students living with HIV who are on treatment and undetectable are still being treated as though they pose a transmission risk. This is both scientifically incorrect and deeply unfair. Spreading U=U awareness is one of the most direct ways to reduce HIV stigma on campuses. LUMA is committed to making U=U common knowledge in every Nigerian university.",
        textFr:
          "La connaissance d'I=I chez les étudiants nigérians est proche de zéro. Cela signifie que des étudiants vivant avec le VIH, sous traitement et indétectables, sont encore traités comme s'ils présentaient un risque de transmission. C'est à la fois scientifiquement incorrect et profondément injuste. Diffuser la connaissance d'I=I est l'un des moyens les plus directs de réduire la stigmatisation du VIH sur les campus. LUMA s'engage à faire d'I=I une connaissance commune dans chaque université nigériane.",
      },
    ],
    related: ["classroom-myth", "prep-explained", "first-year-diagnosis"],
  },
];

// ─── THEME SYSTEM ───────────────────────────────────────────────────────────────

const COLOR_THEMES = {
  watcher: {
    id: "watcher",
    name: "The Watcher",
    primary: "#1A3329",
    accent: "#7A9E8E",
    accentLight: "#D4E2D8",
    border: "#C8DDD0",
  },
  plum: {
    id: "plum",
    name: "Deep Plum",
    primary: "#2D1B3D",
    accent: "#A89BB5",
    accentLight: "#EDE8F5",
    border: "#D8D0E0",
  },
  terra: {
    id: "terra",
    name: "Terracotta",
    primary: "#7C3A2D",
    accent: "#C4A882",
    accentLight: "#F5EBE0",
    border: "#E0CFC0",
  },
};

const getTheme = (colorId, isDark) => {
  const c = COLOR_THEMES[colorId];
  return {
    ...c,
    isDark,
    bg: isDark ? "#0D0D0D" : "#F7F3EC",
    bgAlt: isDark ? "#161616" : c.accentLight,
    surface: isDark ? "#1A1A1A" : "#FFFFFF",
    card: isDark ? "#1E1E1E" : "#FFFFFF",
    text: isDark ? "#F7F3EC" : "#1A1A1A",
    textMuted: isDark ? "#888888" : "#5A6478",
    textLight: "#F7F3EC",
    borderColor: isDark ? "#2C2C2C" : c.border,
    navBg: isDark ? "#111111" : c.primary,
    footerBg: isDark ? "#111111" : c.primary,
    ivory: "#F7F3EC",
  };
};

// ─── ICONS ───────────────────────────────────────────────────────────────────

const Logo = ({
  size = 32,
  variant = "color",
}: {
  color?: string;
  size?: number;
  variant?: "color" | "light";
}) => (
  <img
    src={lumaLogo}
    alt="LUMA — Luminating Africa"
    height={size}
    style={{ height: size, width: "auto", display: "block" }}
  />
);
const ArrowRight = ({ color, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const ArrowLeft = ({ color, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
const SunIcon = ({ color }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = ({ color }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const MenuIcon = ({ color }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = ({ color }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const CheckIcon = ({ color = "#1A3329" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

const Tag = ({ t, children, light }) => (
  <span
    style={{
      display: "inline-block",
      background: light ? "rgba(247,243,236,0.15)" : t.accentLight,
      color: light ? t.ivory : t.primary,
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "1.5px",
      padding: "5px 12px",
      borderRadius: 100,
      textTransform: "uppercase",
      border: `1px solid ${light ? "rgba(247,243,236,0.2)" : t.borderColor}`,
    }}
  >
    {children}
  </span>
);

const Btn = ({ t, children, onClick, variant = "primary", style: ex = {}, type = "button" }) => {
  const base = {
    fontFamily: "'Space Grotesk',sans-serif",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.5px",
    padding: "13px 28px",
    borderRadius: 100,
    cursor: "pointer",
    transition: "all 0.2s",
    border: "2px solid transparent",
    ...ex,
  };
  const variants = {
    primary: { ...base, background: t.primary, color: t.ivory, border: `2px solid ${t.primary}` },
    secondary: {
      ...base,
      background: "transparent",
      color: t.primary,
      border: `2px solid ${t.primary}`,
    },
    light: { ...base, background: t.ivory, color: t.primary },
    ghost: {
      ...base,
      background: "transparent",
      color: t.ivory,
      border: "2px solid rgba(247,243,236,0.4)",
    },
  };
  return (
    <button type={type} style={variants[variant]} onClick={onClick}>
      {children}
    </button>
  );
};

const SectionLabel = ({ t, children, light }) => (
  <p
    style={{
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "2px",
      color: light ? t.accent : t.accent,
      textTransform: "uppercase",
      marginBottom: 12,
    }}
  >
    {children}
  </p>
);

const Card = ({ t, children, style: ex = {}, ...rest }) => (
  <div
    {...rest}
    style={{
      background: t.card,
      border: `1px solid ${t.borderColor}`,
      borderRadius: 16,
      padding: 32,
      ...ex,
    }}
  >
    {children}
  </div>
);

const Input = ({ t, placeholder, type = "text", value, onChange, style: ex = {} }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={{
      width: "100%",
      padding: "13px 16px",
      borderRadius: 10,
      border: `1.5px solid ${t.borderColor}`,
      background: t.isDark ? t.surface : "#fff",
      color: t.text,
      fontFamily: "'DM Sans',sans-serif",
      fontSize: 15,
      outline: "none",
      boxSizing: "border-box",
      ...ex,
    }}
  />
);

const Textarea = ({ t, placeholder, value, onChange, rows = 5 }) => (
  <textarea
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    rows={rows}
    style={{
      width: "100%",
      padding: "13px 16px",
      borderRadius: 10,
      border: `1.5px solid ${t.borderColor}`,
      background: t.isDark ? t.surface : "#fff",
      color: t.text,
      fontFamily: "'DM Sans',sans-serif",
      fontSize: 15,
      outline: "none",
      boxSizing: "border-box",
      resize: "vertical",
    }}
  />
);

const Select = ({ t, children, value, onChange }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      width: "100%",
      padding: "13px 16px",
      borderRadius: 10,
      border: `1.5px solid ${t.borderColor}`,
      background: t.isDark ? t.surface : "#fff",
      color: t.text,
      fontFamily: "'DM Sans',sans-serif",
      fontSize: 15,
      outline: "none",
      boxSizing: "border-box",
      cursor: "pointer",
    }}
  >
    {children}
  </select>
);

const FormSuccess = ({ t, message }) => (
  <div
    style={{
      background: t.accentLight,
      border: `1.5px solid ${t.accent}`,
      borderRadius: 12,
      padding: "20px 24px",
      display: "flex",
      alignItems: "center",
      gap: 12,
    }}
  >
    <CheckIcon color={t.primary} />
    <p
      style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: 15,
        color: t.primary,
        fontWeight: 500,
      }}
    >
      {message}
    </p>
  </div>
);

// ─── NAV ─────────────────────────────────────────────────────────────────────

export const Nav = ({ t, colorId, setColorId, isDark, setIsDark, page, setPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, tr } = useLang();
  const links = [
    [tr("About", "À propos"), "about"],
    [tr("Our Work", "Notre Travail"), "work"],
    [tr("Resources", "Ressources"), "resources"],
    [tr("Get Involved", "S'impliquer"), "involve"],
    [tr("Games", "Jeux"), "games"],
  ];

  const navLink = (label, id) => ({
    color: page === id ? t.ivory : "rgba(247,243,236,0.72)",
    fontFamily: "'Space Grotesk',sans-serif",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "color 0.2s",
    letterSpacing: "0.3px",
    userSelect: "none",
  });

  const dot = (id) => ({
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: COLOR_THEMES[id].primary,
    cursor: "pointer",
    flexShrink: 0,
    transition: "all 0.2s",
    padding: 0,
    boxShadow:
      colorId === id
        ? `0 0 0 2px ${t.isDark ? "#222" : t.ivory}, 0 0 0 4px ${COLOR_THEMES[id].accent}`
        : "none",
    border: id === "plum" && colorId !== id ? "1px solid rgba(255,255,255,0.2)" : "none",
  });

  const darkToggle = {
    background: "rgba(255,255,255,0.14)",
    border: "none",
    borderRadius: 100,
    width: 38,
    height: 22,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: isDark ? "flex-end" : "flex-start",
    padding: "3px 4px",
    transition: "all 0.2s",
    flexShrink: 0,
  };

  return (
    <>
      <nav
        style={{
          background: t.navBg,
          padding: "0 32px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
          transition: "background 0.3s",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <button
          onClick={() => setPage("home")}
          aria-label="LUMA home"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <Logo variant="light" size={36} />
        </button>

        <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
          {links.map(([label, id]) => (
            <button
              key={id}
              type="button"
              style={{ ...navLink(label, id), background: "none", border: "none" }}
              onClick={() => setPage(id)}
              onMouseEnter={(e) => (e.currentTarget.style.color = t.ivory)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = page === id ? t.ivory : "rgba(247,243,236,0.72)")
              }
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            className="desktop-theme-controls"
            style={{ display: "flex", alignItems: "center", gap: 14 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                paddingRight: 14,
                borderRight: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {Object.keys(COLOR_THEMES).map((id) => (
                <button
                  key={id}
                  type="button"
                  style={dot(id)}
                  onClick={() => setColorId(id)}
                  aria-label={`${COLOR_THEMES[id].name} theme`}
                  aria-pressed={colorId === id}
                  title={COLOR_THEMES[id].name}
                />
              ))}
            </div>
            <button
              type="button"
              style={darkToggle}
              onClick={() => setIsDark(!isDark)}
              title={isDark ? "Light mode" : "Dark mode"}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  background: t.ivory,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                {isDark ? <MoonIcon color={t.primary} /> : <SunIcon color={t.primary} />}
              </div>
            </button>
          </div>
          <button
            onClick={() => setPage("involve")}
            style={{
              background: t.ivory,
              color: t.primary,
              border: "none",
              padding: "9px 20px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "'Space Grotesk',sans-serif",
              cursor: "pointer",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
            }}
          >
            {tr("Join LUMA", "Rejoindre LUMA")}
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "none" }}
            className="mobile-menu-btn"
          >
            <MenuIcon color={t.ivory} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: t.navBg,
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            padding: 32,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 48,
            }}
          >
            <Logo variant="light" size={40} />
            <button
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={() => setMenuOpen(false)}
            >
              <CloseIcon color={t.ivory} />
            </button>
          </div>
          {links.map(([label, id]) => (
            <button
              key={id}
              type="button"
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                color: t.ivory,
                fontSize: 32,
                fontWeight: 700,
                fontFamily: "'Space Grotesk',sans-serif",
                cursor: "pointer",
                padding: "14px 0",
                borderBottom: "1px solid rgba(247,243,236,0.1)",
                width: "100%",
              }}
              onClick={() => {
                setPage(id);
                setMenuOpen(false);
              }}
            >
              {label}
            </button>
          ))}
          <div
            style={{
              marginTop: 40,
              display: "flex",
              gap: 14,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {Object.keys(COLOR_THEMES).map((id) => (
              <button
                key={id}
                type="button"
                aria-label={`${COLOR_THEMES[id].name} theme`}
                aria-pressed={colorId === id}
                style={{ ...dot(id), width: 36, height: 36 }}
                onClick={() => setColorId(id)}
              />
            ))}
            <button
              type="button"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{ ...darkToggle, marginLeft: 8, width: 52, height: 30 }}
              onClick={() => setIsDark(!isDark)}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: t.ivory,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isDark ? <MoonIcon color={t.primary} /> : <SunIcon color={t.primary} />}
              </div>
            </button>
          </div>

          {/* LANGUAGE TOGGLE (mobile sandwich menu) */}
          <div style={{ marginTop: 28 }}>
            <p
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: "rgba(247,243,236,0.55)",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              {tr("Language", "Langue")}
            </p>
            <div
              style={{
                display: "inline-flex",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 100,
                padding: 4,
              }}
            >
              {[
                ["en", "English"],
                ["fr", "Français"],
              ].map(([code, label]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  style={{
                    background: lang === code ? t.ivory : "transparent",
                    color: lang === code ? t.primary : t.ivory,
                    border: "none",
                    padding: "8px 18px",
                    borderRadius: 100,
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setPage("involve");
              setMenuOpen(false);
            }}
            style={{
              marginTop: 32,
              background: t.ivory,
              color: t.primary,
              border: "none",
              padding: "16px 32px",
              borderRadius: 100,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Space Grotesk',sans-serif",
              cursor: "pointer",
            }}
          >
            {tr("Join LUMA", "Rejoindre LUMA")}
          </button>
        </div>
      )}
    </>
  );
};

// ─── FOOTER ──────────────────────────────────────────────────────────────────

export const Footer = ({ t, setPage }) => {
  const col = (heading, links) => (
    <div>
      <p
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "1.5px",
          color: t.accent,
          marginBottom: 16,
          textTransform: "uppercase",
        }}
      >
        {heading}
      </p>
      {links.map(([label, action]) => (
        <button
          key={label}
          type="button"
          onClick={action}
          style={{
            background: "none",
            border: "none",
            textAlign: "left",
            color: "rgba(247,243,236,0.65)",
            fontSize: 14,
            fontFamily: "'DM Sans',sans-serif",
            cursor: "pointer",
            display: "block",
            marginBottom: 10,
            transition: "color 0.2s",
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = t.ivory)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(247,243,236,0.65)")}
        >
          {label}
        </button>
      ))}
    </div>
  );
  return (
    <footer style={{ background: t.footerBg, padding: "64px 32px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 48,
            marginBottom: 48,
          }}
        >
          <div>
            <Logo variant="light" size={32} />
            <p
              style={{
                color: "rgba(247,243,236,0.6)",
                fontSize: 14,
                fontFamily: "'DM Sans',sans-serif",
                lineHeight: 1.6,
                marginTop: 12,
                maxWidth: 240,
              }}
            >
              Transforming HIV information into HIV action. Built by youth, for youth.
            </p>
          </div>
          {col("Navigate", [
            ["About LUMA", () => setPage("about")],
            ["Our Work", () => setPage("work")],
            ["Campus Truth Series", () => setPage("truth")],
            ["The Peer Circle", () => setPage("circle")],
            ["Advocacy", () => setPage("advocacy")],
            ["Resources", () => setPage("resources")],
            ["Games", () => setPage("games")],
          ])}
          {col("Get Involved", [
            ["Join The Peer Circle", () => setPage("circle")],
            ["Become an Ambassador", () => setPage("involve")],
            ["Volunteer", () => setPage("involve")],
            ["Partner with LUMA", () => setPage("contact")],
          ])}
          {col("Connect", [
            ["Instagram", () => window.open("https://instagram.com/luma_ng", "_blank")],
            ["X (Twitter)", () => window.open("https://twitter.com/luma_ng", "_blank")],
            ["LinkedIn", () => window.open("https://linkedin.com/company/luma_ng", "_blank")],
            [LUMA_EMAIL, () => (window.location.href = `mailto:${LUMA_EMAIL}`)],
          ])}
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(247,243,236,0.1)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              color: "rgba(247,243,236,0.4)",
              fontSize: 12,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            © 2026 LUMA. A youth-led digital organisation registered in Nigeria.
          </span>
          <span
            style={{
              color: "rgba(247,243,236,0.4)",
              fontSize: 12,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            Designed by .bare
          </span>
        </div>
      </div>
    </footer>
  );
};

// ─── STORY DETAIL PAGE ───────────────────────────────────────────────────────

export const StoryPage = ({ t, story, setPage, setStoryId }) => {
  const { tr, lang } = useLang();
  const related = STORIES.filter((s) => story.related.includes(s.id));
  const s = {
    hero: { background: t.primary, padding: "100px 32px 60px" },
    inner: { maxWidth: 760, margin: "0 auto" },
    wide: { maxWidth: 1100, margin: "0 auto" },
    h1: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: "clamp(28px,4.5vw,52px)",
      fontWeight: 800,
      color: t.ivory,
      lineHeight: 1.15,
      marginTop: 16,
    },
    back: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "rgba(247,243,236,0.7)",
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: 14,
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: 0,
      marginBottom: 32,
    },
    section: { padding: "64px 32px", background: t.bg },
    lead: {
      fontFamily: "'DM Sans',sans-serif",
      fontSize: 20,
      color: t.text,
      lineHeight: 1.8,
      fontWeight: 500,
      marginBottom: 32,
      borderLeft: `4px solid ${t.accent}`,
      paddingLeft: 24,
    },
    heading: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: 24,
      fontWeight: 700,
      color: t.text,
      marginTop: 40,
      marginBottom: 16,
    },
    body: {
      fontFamily: "'DM Sans',sans-serif",
      fontSize: 17,
      color: t.textMuted,
      lineHeight: 1.8,
      marginBottom: 20,
    },
    callout: {
      background: t.isDark ? t.card : t.accentLight,
      border: `1px solid ${t.borderColor}`,
      borderLeft: `4px solid ${t.accent}`,
      borderRadius: "0 12px 12px 0",
      padding: "24px 28px",
      margin: "32px 0",
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: 17,
      fontWeight: 600,
      color: t.primary,
      lineHeight: 1.6,
    },
    relatedSection: { padding: "64px 32px", background: t.isDark ? t.surface : t.accentLight },
    relatedGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
      gap: 20,
      marginTop: 32,
    },
    relatedCard: {
      background: t.card,
      border: `1px solid ${t.borderColor}`,
      borderRadius: 14,
      padding: 24,
      cursor: "pointer",
      transition: "transform 0.2s",
    },
  };

  return (
    <div>
      <div style={s.hero}>
        <div style={s.inner}>
          <button style={s.back} onClick={() => setPage("truth")}>
            <ArrowLeft color="rgba(247,243,236,0.7)" size={14} /> {tr("Back to Campus Truth Series", "Retour à la série Vérité Campus")}
          </button>
          <Tag t={t} light>
            {lang === "fr" && story.tagFr ? story.tagFr : story.tag}
          </Tag>
          <h1 style={s.h1}>{lang === "fr" && story.titleFr ? story.titleFr : story.title}</h1>
          <p
            style={{
              color: "rgba(247,243,236,0.55)",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 13,
              marginTop: 20,
            }}
          >
            {story.date} · {story.readTime}
            {story.author ? ` · ${tr("Shared by", "Partagé par")} ${story.author}` : ""}
          </p>
        </div>
      </div>

      <section style={s.section}>
        <div style={s.inner}>
          {story.content.map((block, i) => {
            const text = lang === "fr" && block.textFr ? block.textFr : block.text;
            if (block.type === "lead")
              return (
                <p key={i} style={s.lead}>
                  {text}
                </p>
              );
            if (block.type === "heading")
              return (
                <h2 key={i} style={s.heading}>
                  {text}
                </h2>
              );
            if (block.type === "body")
              return (
                <p key={i} style={s.body}>
                  {text}
                </p>
              );
            if (block.type === "callout")
              return (
                <div key={i} style={s.callout}>
                  {text}
                </div>
              );
            return null;
          })}

          <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${t.borderColor}` }}>
            <p
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: t.accent,
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {tr("Found this useful?", "Cela vous a été utile ?")}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn t={t} variant="primary" onClick={() => setPage("circle")}>
                {tr("Join The Peer Circle", "Rejoindre le Cercle des Pairs")}
              </Btn>
              <Btn
                t={t}
                variant="secondary"
                onClick={() => {
                  setPage("contact");
                }}
              >
                {tr("Submit a Myth", "Signaler une rumeur")}
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
      <section style={s.relatedSection}>
        <div style={s.wide}>
          <SectionLabel t={t}>{tr("Continue Reading", "Continuer la lecture")}</SectionLabel>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: t.text,
              marginBottom: 0,
            }}
          >
            {tr("More from the Campus Truth Series", "Plus d'articles de la série Vérité Campus")}
          </h2>
          <div style={s.relatedGrid}>
            {related.map((rs) => (
              <div
                key={rs.id}
                style={s.relatedCard}
                onClick={() => {
                  setStoryId(rs.id);
                  setPage("story");
                  window.scrollTo(0, 0);
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <Tag t={t}>{lang === "fr" && rs.tagFr ? rs.tagFr : rs.tag}</Tag>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: t.text,
                    lineHeight: 1.4,
                    margin: "12px 0 8px",
                  }}
                >
                  {lang === "fr" && rs.titleFr ? rs.titleFr : rs.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: t.textMuted }}>
                  {rs.readTime}
                </p>
                <p
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: t.accent,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 12,
                  }}
                >
                  {tr("Read", "Lire")} <ArrowRight color={t.accent} size={12} />
                </p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Btn t={t} variant="primary" onClick={() => setPage("truth")}>
              {tr("All Campus Truth Posts", "Tous les articles Vérité Campus")}
            </Btn>
          </div>
        </div>
      </section>
      )}
    </div>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

export const HomePage = ({ t, setPage, setStoryId }) => {
  const { tr } = useLang();
  const s = {
    hero: {
      background: t.primary,
      minHeight: "92vh",
      display: "flex",
      alignItems: "center",
      padding: "80px 32px",
      position: "relative",
      overflow: "hidden",
    },
    h1: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: "clamp(40px,6vw,76px)",
      fontWeight: 800,
      color: t.ivory,
      lineHeight: 1.06,
      marginTop: 20,
      marginBottom: 24,
      letterSpacing: "-1px",
    },
    heroSub: {
      fontFamily: "'DM Sans',sans-serif",
      fontSize: 18,
      color: "rgba(247,243,236,0.72)",
      lineHeight: 1.75,
      marginBottom: 40,
      maxWidth: 520,
    },
    section: { padding: "96px 32px", background: t.bg },
    sectionAlt: { padding: "96px 32px", background: t.isDark ? t.surface : t.accentLight },
    sectionDark: { padding: "96px 32px", background: t.primary },
    inner: { maxWidth: 1100, margin: "0 auto" },
    h2: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: "clamp(28px,4vw,52px)",
      fontWeight: 800,
      color: t.text,
      lineHeight: 1.1,
      marginBottom: 20,
    },
    h2Light: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: "clamp(28px,4vw,52px)",
      fontWeight: 800,
      color: t.ivory,
      lineHeight: 1.1,
      marginBottom: 20,
    },
    body: {
      fontFamily: "'DM Sans',sans-serif",
      fontSize: 17,
      color: t.textMuted,
      lineHeight: 1.75,
    },
    bodyLight: {
      fontFamily: "'DM Sans',sans-serif",
      fontSize: 17,
      color: "rgba(247,243,236,0.7)",
      lineHeight: 1.75,
    },
    grid3: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
      gap: 24,
      marginTop: 48,
    },
    pillarNum: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: 52,
      fontWeight: 800,
      color: t.isDark ? t.card : t.accentLight,
      lineHeight: 1,
      marginBottom: 12,
    },
    linkText: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: 13,
      fontWeight: 700,
      color: t.accent,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
  };

  const pillars = [
    {
      num: "01",
      title: tr("Inform", "Informer"),
      body: tr(
        "We do not just deliver HIV information. Nigerian students already have it. We make that information actionable, contextual, and impossible to ignore. Every Campus Truth Series article moves students from knowing to doing.",
        "Nous ne nous contentons pas de transmettre de l'information sur le VIH. Les étudiants nigérians l'ont déjà. Nous rendons cette information actionnable, contextuelle, et impossible à ignorer. Chaque article de la Campus Truth Series fait passer les étudiants du savoir à l'agir.",
      ),
      page: "truth",
    },
    {
      num: "02",
      title: tr("Advocate", "Défendre"),
      body: tr(
        "Knowing your rights and exercising your rights are two completely different things. LUMA equips students with the tools, language, and confidence to turn legal knowledge into real protection on their campuses.",
        "Connaître ses droits et les exercer sont deux choses complètement différentes. LUMA équipe les étudiants des outils, du langage et de la confiance nécessaires pour transformer la connaissance juridique en protection réelle sur leurs campus.",
      ),
      page: "advocacy",
    },
    {
      num: "03",
      title: tr("Belong", "Appartenir"),
      body: tr(
        "Community is where information becomes knowledge. In the Peer Circle, what students know in theory becomes something they can live with, talk about, and act on together.",
        "C'est dans la communauté que l'information devient connaissance. Dans le Cercle de pairs, ce que les étudiants savent en théorie devient quelque chose qu'ils peuvent vivre, dont ils peuvent parler et sur lequel ils peuvent agir ensemble.",
      ),
      page: "circle",
    },
  ];

  return (
    <div>
      <section style={s.hero}>
        <svg
          style={{
            position: "absolute",
            right: -80,
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.05,
            pointerEvents: "none",
          }}
          width="700"
          height="700"
          viewBox="0 0 700 700"
        >
          <path
            d="M100 600 Q350 50 600 600"
            stroke="white"
            strokeWidth="130"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <div style={{ maxWidth: 640, position: "relative", zIndex: 2 }}>
          <Tag t={t} light>
            {tr(
              "From Information to Knowledge. From Knowledge to Action.",
              "De l'information à la connaissance. De la connaissance à l'action.",
            )}
          </Tag>
          <h1 style={s.h1}>
            {tr(
              "Most Nigerian university students already know the HIV facts. LUMA makes those facts matter.",
              "La plupart des étudiants universitaires nigérians connaissent déjà les faits sur le VIH. LUMA fait en sorte que ces faits comptent.",
            )}
          </h1>
          <p style={s.heroSub}>
            {tr(
              "Knowing that HIV is not transmitted through casual contact does not stop stigma. Knowing your legal rights does not mean you will use them. Knowing PrEP exists does not mean you will access it. LUMA closes the gap between what you know and what you do.",
              "Savoir que le VIH ne se transmet pas par contact occasionnel n'arrête pas la stigmatisation. Connaître ses droits légaux ne signifie pas qu'on les utilisera. Savoir que la PrEP existe ne signifie pas qu'on y accédera. LUMA comble l'écart entre ce que vous savez et ce que vous faites.",
            )}
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Btn t={t} variant="light" onClick={() => setPage("about")}>
              {tr("Learn About LUMA", "En savoir plus sur LUMA")}
            </Btn>
            <Btn t={t} variant="ghost" onClick={() => setPage("work")}>
              {tr("See Our Work", "Voir notre travail")}
            </Btn>
          </div>
        </div>
      </section>

      <div
        style={{
          background: t.bg,
          padding: "48px 32px",
          borderBottom: `1px solid ${t.borderColor}`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 2,
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {[
            [
              "96.85%",
              tr(
                "of Nigerian university students already have high HIV knowledge",
                "des étudiants universitaires nigérians ont déjà une haute connaissance du VIH",
              ),
              tr("Campus research, 2024", "Recherche sur campus, 2024"),
            ],
            [
              "55.5%",
              tr(
                "still hold stigmatising attitudes toward PLHIV despite that knowledge",
                "ont encore des attitudes stigmatisantes envers les PVVIH malgré cette connaissance",
              ),
              tr("The gap LUMA closes", "L'écart que LUMA comble"),
            ],
            [
              "0",
              tr(
                "organisations closing the Information-to-Action gap for Nigerian university students before LUMA",
                "organisations comblant l'écart Information-Action pour les étudiants universitaires nigérians avant LUMA",
              ),
              tr("As of June 2026", "En date de juin 2026"),
            ],
          ].map(([num, label, src], i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "24px 16px",
                borderRight: i < 2 ? `1px solid ${t.borderColor}` : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: "clamp(32px,4vw,52px)",
                  fontWeight: 800,
                  color: t.primary,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 13,
                  color: t.textMuted,
                  lineHeight: 1.4,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 11,
                  color: t.accent,
                  marginTop: 6,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}
              >
                {src}
              </div>
            </div>
          ))}
        </div>
      </div>

      <section style={s.section}>
        <div style={s.inner}>
          <SectionLabel t={t}>{tr("What LUMA Does", "Ce que fait LUMA")}</SectionLabel>
          <h2 style={s.h2}>
            {tr("Three promises.", "Trois promesses.")}
            <br />
            {tr("One organisation.", "Une seule organisation.")}
          </h2>
          <div style={s.grid3}>
            {pillars.map((p) => (
              <Card key={p.num} t={t}>
                <div style={s.pillarNum}>{p.num}</div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: t.text,
                    marginBottom: 12,
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ ...s.body, marginBottom: 20 }}>{p.body}</p>
                <span style={s.linkText} onClick={() => setPage(p.page)}>
                  {tr("Explore", "Découvrir")} {p.title} <ArrowRight color={t.accent} size={13} />
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={s.sectionDark}>
        <div style={{ ...s.inner, textAlign: "center" }}>
          <SectionLabel t={t}>
            {tr("Status Neutral by Design", "Statut neutre par conception")}
          </SectionLabel>
          <p
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(22px,3.5vw,44px)",
              fontWeight: 700,
              color: t.ivory,
              lineHeight: 1.3,
              maxWidth: 780,
              margin: "24px auto",
            }}
          >
            {tr(
              "The Information-to-Action gap affects every student, regardless of HIV status.",
              "L'écart Information-Action affecte chaque étudiant, quel que soit son statut sérologique.",
            )}
          </p>
          <p style={{ ...s.bodyLight, maxWidth: 640, margin: "0 auto 16px" }}>
            {tr(
              "LUMA is status neutral because the Information-to-Action gap affects every student regardless of HIV status. HIV positive students who know their rights but cannot exercise them. HIV negative students who know about PrEP but have never accessed it. Allies who know stigma is wrong but stay silent anyway.",
              "LUMA est à statut neutre parce que l'écart Information-Action affecte chaque étudiant, quel que soit son statut VIH. Des étudiants séropositifs qui connaissent leurs droits mais ne peuvent pas les exercer. Des étudiants séronégatifs qui connaissent la PrEP mais n'y ont jamais accédé. Des alliés qui savent que la stigmatisation est injuste mais restent silencieux.",
            )}
          </p>
          <p style={{ ...s.bodyLight, maxWidth: 640, margin: "0 auto 40px" }}>
            {tr(
              "LUMA closes the gap for all of them.",
              "LUMA comble cet écart pour chacun d'entre eux.",
            )}
          </p>
          <Btn t={t} variant="ghost" onClick={() => setPage("about")}>
            {tr("Read More About Our Approach", "En savoir plus sur notre approche")}
          </Btn>
        </div>
      </section>

      <section style={s.sectionAlt}>
        <div style={s.inner}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <SectionLabel t={t}>Impact Study Highlight</SectionLabel>
            <blockquote
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(22px,3vw,36px)",
                fontWeight: 600,
                color: t.text,
                lineHeight: 1.35,
                margin: "24px 0 20px",
                borderLeft: `4px solid ${t.accent}`,
                paddingLeft: 24,
              }}
            >
              "96.85% of university students show high knowledge of HIV facts, yet only 55.52% hold
              positive, non-stigmatising attitudes toward their peers."
            </blockquote>
            <p
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: t.accent,
                paddingLeft: 28,
              }}
            >
              SOURCE: CAMPUS TRUTH STIGMA POLL (JUNE 2026)
            </p>
          </div>
        </div>
      </section>

      <section style={s.sectionAlt}>
        <div style={s.inner}>
          <SectionLabel t={t}>From the Campus Truth Series</SectionLabel>
          <h2 style={s.h2}>
            What students get wrong
            <br />
            about HIV
          </h2>
          <div style={s.grid3}>
            {STORIES.slice(0, 3).map((story) => (
              <Card
                key={story.id}
                t={t}
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <Tag t={t}>{story.tag}</Tag>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 17,
                    fontWeight: 700,
                    color: t.text,
                    lineHeight: 1.4,
                  }}
                >
                  {story.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 14,
                    color: t.textMuted,
                    lineHeight: 1.6,
                  }}
                >
                  {story.excerpt.slice(0, 100)}...
                </p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: t.textMuted }}>
                  {story.date} · {story.readTime}
                </p>
                <span
                  style={s.linkText}
                  onClick={() => {
                    setStoryId(story.id);
                    setPage("story");
                    window.scrollTo(0, 0);
                  }}
                >
                  Read More <ArrowRight color={t.accent} size={12} />
                </span>
              </Card>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <Btn t={t} variant="primary" onClick={() => setPage("truth")}>
              See All Campus Truth Posts
            </Btn>
          </div>
        </div>
      </section>

      <section style={s.section}>
        <div style={s.inner}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              background: t.isDark ? t.card : t.accentLight,
              borderRadius: 24,
              padding: "64px 40px",
              border: `1px solid ${t.borderColor}`,
            }}
          >
            <SectionLabel t={t}>Play and Learn</SectionLabel>
            <h2 style={{ ...s.h2, maxWidth: 600 }}>
              Three games that teach you what a lecture never will.
            </h2>
            <p style={{ ...s.body, maxWidth: 540, marginBottom: 32 }}>
              Myth Buster, LUMA Challenge Quiz, and Campus Quest. Each game under 10 minutes. Each
              one changes how you see HIV on your campus.
            </p>
            <Btn t={t} variant="primary" onClick={() => setPage("games")}>
              Play Now
            </Btn>
          </div>
        </div>
      </section>
      <section style={s.section}>
        <div style={s.inner}>
          <div
            style={{
              background: t.isDark ? t.card : "rgba(247,243,236,0.7)",
              borderRadius: 20,
              padding: 48,
              borderLeft: `4px solid ${t.accent}`,
              maxWidth: 780,
              margin: "0 auto",
            }}
          >
            <SectionLabel t={t}>A Note From Our Founder</SectionLabel>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 20,
                fontStyle: "italic",
                color: t.text,
                lineHeight: 1.75,
                marginBottom: 24,
                marginTop: 16,
              }}
            >
              "I built LUMA because I saw the gap up close. Students who knew the facts but still
              stigmatised their classmates. Students who knew their rights but had no idea how to
              use them. Students who had never heard of PrEP despite it being available for years.
              Information was never the problem. Action was. LUMA is the bridge."
            </p>
            <p
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: t.primary,
              }}
            >
              Adebare Hammed, Founder, LUMA
            </p>
            <div style={{ marginTop: 24 }}>
              <Btn t={t} variant="primary" onClick={() => setPage("about")}>
                Meet the Founder
              </Btn>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: t.primary, padding: "80px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ ...s.h2Light, textAlign: "center" }}>Ready to be part of something real?</h2>
          <p style={{ ...s.bodyLight, marginBottom: 40 }}>
            Whether you are a student, researcher, health worker, or someone with lived HIV
            experience, LUMA has a place for you.
          </p>
          <Btn t={t} variant="light" onClick={() => setPage("involve")}>
            Get Involved
          </Btn>
        </div>
      </section>
    </div>
  );
};

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────

export const AboutPage = ({ t }) => {
  const { tr } = useLang();
  const s = {
    hero: { background: t.primary, padding: "120px 32px 80px" },
    inner: { maxWidth: 1100, margin: "0 auto" },
    section: { padding: "80px 32px", background: t.bg },
    sectionAlt: { padding: "80px 32px", background: t.isDark ? t.surface : t.accentLight },
    sectionDark: { padding: "80px 32px", background: t.primary },
    h1: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: "clamp(36px,5vw,64px)",
      fontWeight: 800,
      color: t.ivory,
      lineHeight: 1.1,
      marginTop: 16,
    },
    h2: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: "clamp(26px,3.5vw,42px)",
      fontWeight: 800,
      color: t.text,
      lineHeight: 1.2,
      marginBottom: 20,
    },
    h2Light: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: "clamp(26px,3.5vw,42px)",
      fontWeight: 800,
      color: t.ivory,
      lineHeight: 1.2,
      marginBottom: 20,
    },
    body: {
      fontFamily: "'DM Sans',sans-serif",
      fontSize: 17,
      color: t.textMuted,
      lineHeight: 1.8,
      marginBottom: 16,
    },
    bodyLight: {
      fontFamily: "'DM Sans',sans-serif",
      fontSize: 17,
      color: "rgba(247,243,236,0.7)",
      lineHeight: 1.8,
      marginBottom: 16,
    },
  };
  return (
    <div>
      <div style={s.hero}>
        <div style={s.inner}>
          <Tag t={t} light>
            {tr("Our Story", "Notre histoire")}
          </Tag>
          <h1 style={s.h1}>
            {tr("From Information to Knowledge.", "De l'information à la connaissance.")}
            <br />
            {tr("From Knowledge to Action.", "De la connaissance à l'action.")}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 18,
              color: "rgba(247,243,236,0.72)",
              lineHeight: 1.7,
              maxWidth: 620,
              marginTop: 20,
            }}
          >
            {tr(
              "LUMA exists to transform HIV information into HIV knowledge among Nigerian university students. We take what students already know and make it something they can use, act on, and live by.",
              "LUMA existe pour transformer l'information sur le VIH en connaissance chez les étudiants universitaires nigérians. Nous prenons ce que les étudiants savent déjà et en faisons quelque chose qu'ils peuvent utiliser, sur lequel ils peuvent agir et qu'ils peuvent vivre au quotidien.",
            )}
          </p>
        </div>
      </div>

      <section style={s.section}>
        <div style={s.inner}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 64,
              alignItems: "center",
            }}
          >
            <div>
              <SectionLabel t={t}>
                {tr("The Problem Nobody Named", "Le problème que personne ne nommait")}
              </SectionLabel>
              <h2 style={s.h2}>{tr("The gap LUMA fills", "Le vide que LUMA comble")}</h2>
              <p style={s.body}>
                {tr(
                  "Nigeria has over 1.9 million people living with HIV. University campuses have no dedicated HIV support, no anti-discrimination policies, and no peer community for students navigating a positive status.",
                  "Le Nigéria compte plus de 1,9 million de personnes vivant avec le VIH. Les campus universitaires n'ont aucun soutien dédié au VIH, aucune politique anti-discrimination, et aucune communauté de pairs pour les étudiants séropositifs.",
                )}
              </p>
              <p style={s.body}>
                {tr(
                  "But the deeper problem is not a lack of information. Research shows 96.85% of students already have high HIV knowledge. The problem is that information is not translating into action. Students are not accessing PrEP. Not exercising their rights. Not challenging stigma even when they know it is wrong.",
                  "Mais le problème le plus profond n'est pas un manque d'information. Les recherches montrent que 96,85 % des étudiants ont déjà un haut niveau de connaissance sur le VIH. Le problème, c'est que cette information ne se traduit pas en action. Les étudiants n'accèdent pas à la PrEP. Ils n'exercent pas leurs droits. Ils ne remettent pas en question la stigmatisation, même quand ils savent qu'elle est injuste.",
                )}
              </p>
              <p style={s.body}>
                {tr(
                  "LUMA is the organisation that closes that gap.",
                  "LUMA est l'organisation qui comble ce vide.",
                )}
              </p>
            </div>
            <div
              style={{
                background: t.primary,
                borderRadius: 16,
                padding: "48px 32px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 80,
                  fontWeight: 800,
                  color: t.ivory,
                  lineHeight: 1,
                }}
              >
                0
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 16,
                  color: "rgba(247,243,236,0.7)",
                  lineHeight: 1.5,
                  marginTop: 12,
                }}
              >
                {tr(
                  "Dedicated HIV platforms for Nigerian university students before LUMA",
                  "Plateformes dédiées au VIH pour les étudiants universitaires nigérians avant LUMA",
                )}
              </p>
              <p
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: t.accent,
                  marginTop: 16,
                  letterSpacing: "1px",
                }}
              >
                {tr("AS OF JUNE 2026", "EN DATE DE JUIN 2026")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={s.sectionAlt}>
        <div style={s.inner}>
          <SectionLabel t={t}>{tr("How We Think About HIV", "Notre approche du VIH")}</SectionLabel>
          <h2 style={s.h2}>
            {tr("The status neutral foundation", "Le fondement du statut neutre")}
          </h2>
          <p style={s.body}>
            {tr(
              "LUMA is built on the status neutral approach, a modern HIV framework that puts the person ahead of their HIV status. It means we do not run separate programs for positive and negative students. We build one space, one curriculum, one community.",
              "LUMA repose sur l'approche du statut neutre, un cadre moderne face au VIH qui place la personne avant son statut sérologique. Cela signifie que nous ne gérons pas de programmes séparés pour les étudiants séropositifs et séronégatifs. Nous construisons un seul espace, un seul programme, une seule communauté.",
            )}
          </p>
          <p style={s.body}>
            {tr(
              "Because the divide between positive and negative is exactly where stigma lives, and LUMA refuses to replicate it.",
              "Car c'est précisément dans cette division entre séropositifs et séronégatifs que vit la stigmatisation, et LUMA refuse de la reproduire.",
            )}
          </p>
        </div>
      </section>

      <section style={s.sectionDark}>
        <div style={s.inner}>
          <SectionLabel t={t}>{tr("The Founder", "Le fondateur")}</SectionLabel>
          <h2 style={s.h2Light}>Adebare Hammed</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {[
              tr("Youth Advocate", "Défenseur de la jeunesse"),
              tr("Peer Mentor", "Mentor pair"),
              tr("CS Undergraduate", "Étudiant en informatique"),
              tr("HIV Activist", "Militant VIH"),
              tr("Researcher", "Chercheur"),
            ].map((r) => (
              <span
                key={r}
                style={{
                  background: "rgba(247,243,236,0.12)",
                  color: t.ivory,
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "5px 14px",
                  borderRadius: 100,
                }}
              >
                {r}
              </span>
            ))}
          </div>
          <p style={s.bodyLight}>
            {tr(
              "Adebare Hammed is completing a Computer Science degree at Kwara State University in July 2026. He is a Youth Advocate, Peer Mentor, and researcher whose work sits at the intersection of HIV advocacy, campus health policy, and youth rights in Nigeria.",
              "Adebare Hammed termine une licence en informatique à la Kwara State University en juillet 2026. Il est défenseur de la jeunesse, mentor pair, et chercheur, avec un travail à la croisée du plaidoyer VIH, de la politique de santé sur les campus et des droits des jeunes au Nigéria.",
            )}
          </p>
          <p style={s.bodyLight}>
            {tr(
              "He founded LUMA after years of observing a gap no organisation was addressing: Nigerian university students have HIV information but lack the tools, community, and confidence to act on it.",
              "Il a fondé LUMA après des années à observer un vide qu'aucune organisation ne comblait : les étudiants universitaires nigérians ont l'information sur le VIH, mais leur manquent les outils, la communauté et la confiance pour agir en conséquence.",
            )}
          </p>
          <p style={s.bodyLight}>
            {tr(
              "His research spans PrEP awareness at KWASU and HIV stigma and mental health across Nigerian youth HIV networks. He has facilitated sessions at the Adolescent Girls Summit 2026 in Yamoussoukro and participated in the African Regional Convening organised by Sonke Gender Justice in Nairobi.",
              "Ses recherches portent sur la sensibilisation à la PrEP à la KWASU ainsi que sur la stigmatisation liée au VIH et la santé mentale au sein des réseaux VIH de jeunes nigérians. Il a animé des sessions au Sommet des filles adolescentes 2026 à Yamoussoukro et a participé à la Convention régionale africaine organisée par Sonke Gender Justice à Nairobi.",
            )}
          </p>
          <p
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 13,
              color: t.accent,
              marginTop: 20,
            }}
          >
            UNESCO Nigeria Youth Network · Kectil Global Leadership Program · Aspire Leadership
            Program
          </p>
        </div>
      </section>

      <section style={s.section}>
        <div style={s.inner}>
          <SectionLabel t={t}>
            {tr("Our Evidence Base", "Notre base de données probantes")}
          </SectionLabel>
          <h2 style={s.h2}>{tr("Our research", "Nos recherches")}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
              marginTop: 32,
            }}
          >
            {[
              {
                title: tr(
                  "PrEP Awareness at Kwara State University",
                  "Sensibilisation à la PrEP à la Kwara State University",
                ),
                body: tr(
                  "Examining PrEP knowledge, barriers to access, and the role of campus health services in PrEP education among KWASU students.",
                  "Une étude sur la connaissance de la PrEP, les obstacles à son accès, et le rôle des services de santé du campus dans l'éducation à la PrEP chez les étudiants de la KWASU.",
                ),
              },
              {
                title: tr(
                  "HIV Stigma and Mental Health Across APYIN Branches",
                  "Stigmatisation du VIH et santé mentale au sein des antennes APYIN",
                ),
                body: tr(
                  "A multi-site study on the relationship between HIV-related stigma and mental health outcomes among young people living with HIV across Nigeria.",
                  "Une étude multi-sites sur le lien entre la stigmatisation liée au VIH et la santé mentale chez les jeunes vivant avec le VIH à travers le Nigéria.",
                ),
              },
            ].map((study, i) => (
              <Card key={i} t={t}>
                <Tag t={t}>{tr("Ongoing Research", "Recherche en cours")}</Tag>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 19,
                    fontWeight: 700,
                    color: t.text,
                    lineHeight: 1.4,
                    marginTop: 16,
                    marginBottom: 12,
                  }}
                >
                  {study.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 15,
                    color: t.textMuted,
                    lineHeight: 1.7,
                  }}
                >
                  {study.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── CAMPUS TRUTH PAGE ────────────────────────────────────────────────────────

export const TruthPage = ({ t, setPage, setStoryId }) => {
  const { tr, lang } = useLang();
  const [communityStories, setCommunityStories] = useState([]);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/stories")
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled && json.ok) setCommunityStories(json.stories);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  const allStories = [...STORIES, ...communityStories];
  return (
    <div>
      <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Tag t={t} light>
            {tr("From the Inform Pillar", "Du pilier Informer")}
          </Tag>
          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(36px,5vw,60px)",
              fontWeight: 800,
              color: t.ivory,
              lineHeight: 1.1,
              marginTop: 16,
            }}
          >
            {tr("The Campus Truth Series", "La série Vérité Campus")}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 18,
              color: "rgba(247,243,236,0.7)",
              lineHeight: 1.7,
              maxWidth: 620,
              marginTop: 16,
            }}
          >
            {tr(
              "The Campus Truth Series does not just tell students what is true. It shows them what to do with the truth. Every article ends with action, not just information.",
              "La série Vérité Campus ne se contente pas de dire aux étudiants ce qui est vrai. Elle leur montre quoi faire de cette vérité. Chaque article se termine par une action, pas seulement une information."
            )}
          </p>
        </div>
      </div>
      <section style={{ padding: "80px 32px", background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 24,
            }}
          >
            {allStories.map((story) => (
              <Card
                key={story.id}
                t={t}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onClick={() => {
                  setStoryId(story.id);
                  setPage("story");
                  window.scrollTo(0, 0);
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <Tag t={t}>{lang === "fr" && story.tagFr ? story.tagFr : story.tag}</Tag>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: t.text,
                    lineHeight: 1.4,
                  }}
                >
                  {lang === "fr" && story.titleFr ? story.titleFr : story.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 14,
                    color: t.textMuted,
                    lineHeight: 1.6,
                  }}
                >
                  {lang === "fr" && story.excerptFr ? story.excerptFr : story.excerpt}
                </p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: t.textMuted }}>
                  {story.date} · {story.readTime}
                </p>
                <span
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: t.accent,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {tr("Read Full Story", "Lire l'article complet")} <ArrowRight color={t.accent} size={12} />
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: t.primary, padding: "80px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(24px,3vw,38px)",
              fontWeight: 800,
              color: t.ivory,
              marginBottom: 16,
            }}
          >
            {tr(
              "Heard something about HIV you are not sure about?",
              "Vous avez entendu quelque chose sur le VIH dont vous n'êtes pas sûr ?"
            )}
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 16,
              color: "rgba(247,243,236,0.7)",
              marginBottom: 32,
            }}
          >
            {tr(
              "Send it to us. If it is a myth circulating on your campus, we will research it and publish the truth.",
              "Envoyez-le-nous. S'il s'agit d'une rumeur qui circule sur votre campus, nous ferons des recherches et publierons la vérité."
            )}
          </p>
          <Btn t={t} variant="light" onClick={() => setPage("contact")}>
            {tr("Submit a Myth", "Signaler une rumeur")}
          </Btn>
        </div>
      </section>
    </div>
  );
};

// ─── PEER CIRCLE PAGE ─────────────────────────────────────────────────────────

const YEAR_OPTIONS = [
  "100 Level / First Year",
  "200 Level / Second Year",
  "300 Level / Third Year",
  "400 Level / Fourth Year",
  "500 Level / Fifth Year",
  "Final Year (other)",
  "Postgraduate",
  "Prefer not to say",
];

export const CirclePage = ({ t }) => {
  const { tr } = useLang();
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    university: "",
    year: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  // Story submission state
  const [story, setStory] = useState({
    identification: "Anonymous — my name will not appear anywhere on the story",
    chosenName: "",
    email: "",
    university: "",
    story: "",
    instructions: "",
  });
  const [storySent, setStorySent] = useState(false);
  const [storySending, setStorySending] = useState(false);

  const handleSubmit = async () => {
    if (!form.displayName || !form.email || !form.university || !form.year) return;
    setSending(true);
    await submitToEmail("Peer Circle Application", {
      "Display Name": form.displayName,
      "Email (for recovery)": form.email,
      University: form.university,
      Year: form.year,
      Notes: form.notes || "(none)",
    });
    setSending(false);
    setSubmitted(true);
  };

  const handleStory = async () => {
    if (!story.email || !story.story) return;
    setStorySending(true);
    await submitToEmail("Voices From Campus — Story Submission", {
      Identification: story.identification,
      "Name / Chosen Name": story.chosenName || "(not provided)",
      Email: story.email,
      University: story.university || "(not provided)",
      Story: story.story,
      "Handling Instructions": story.instructions || "(none)",
    });
    setStorySending(false);
    setStorySent(true);
  };

  const s = {
    hero: { background: t.primary, padding: "120px 32px 80px" },
    inner: { maxWidth: 900, margin: "0 auto" },
    section: { padding: "80px 32px", background: t.bg },
    sectionAlt: { padding: "80px 32px", background: t.isDark ? t.surface : t.accentLight },
    h2: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: "clamp(26px,3.5vw,42px)",
      fontWeight: 800,
      color: t.text,
      lineHeight: 1.2,
      marginBottom: 20,
    },
    body: {
      fontFamily: "'DM Sans',sans-serif",
      fontSize: 17,
      color: t.textMuted,
      lineHeight: 1.8,
      marginBottom: 16,
    },
    darkInput: {
      background: "rgba(255,255,255,0.08)",
      color: t.ivory,
      borderColor: "rgba(247,243,236,0.2)",
    },
    darkLabel: {
      fontFamily: "'DM Sans',sans-serif",
      fontSize: 13,
      color: "rgba(247,243,236,0.7)",
      marginBottom: 6,
      display: "block",
    },
  };

  return (
    <div>
      <div style={s.hero}>
        <div style={s.inner}>
          <Tag t={t} light>
            {tr("From the Belong Pillar", "Du pilier Appartenir")}
          </Tag>
          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(36px,5vw,60px)",
              fontWeight: 800,
              color: t.ivory,
              lineHeight: 1.1,
              marginTop: 16,
            }}
          >
            {tr("You do not have to figure this out alone.", "Vous n'avez pas à traverser cela seul.")}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 18,
              color: "rgba(247,243,236,0.7)",
              lineHeight: 1.7,
              maxWidth: 540,
              marginTop: 16,
            }}
          >
            {tr(
              "The Peer Circle is a closed digital community for university students living with HIV in Nigeria. Peer-led. Confidential. Built by people who understand.",
              "Le Cercle des Pairs est une communauté numérique fermée pour les étudiants universitaires vivant avec le VIH au Nigéria. Animée par des pairs. Confidentielle. Créée par des personnes qui comprennent."
            )}
          </p>
        </div>
      </div>

      <section style={s.section}>
        <div style={s.inner}>
          <SectionLabel t={t}>{tr("A Space Built For You", "Un espace conçu pour vous")}</SectionLabel>
          <h2 style={s.h2}>{tr("What the Peer Circle is", "Ce qu'est le Cercle des Pairs")}</h2>
          <p style={s.body}>
            {tr(
              "The Peer Circle is not a forum. It is not a helpline. It is a community of Nigerian university students who are navigating HIV together. Some members share openly. Others prefer anonymity. Both are equally welcome and equally safe here.",
              "Le Cercle des Pairs n'est pas un forum. Ce n'est pas une ligne d'assistance. C'est une communauté d'étudiants nigérians qui traversent le VIH ensemble. Certains membres s'expriment ouvertement. D'autres préfèrent l'anonymat. Les deux sont également bienvenus et également en sécurité ici."
            )}
          </p>
          <p style={s.body}>
            {tr(
              "Inside The Peer Circle you will find peer support conversations, shared resources for campus life with HIV, and guidance from people who have been in your exact position.",
              "Dans le Cercle des Pairs, vous trouverez des conversations de soutien entre pairs, des ressources partagées pour la vie sur le campus avec le VIH, et des conseils de personnes qui ont vécu exactement ce que vous vivez."
            )}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 24,
              marginTop: 40,
            }}
          >
            {[
              [
                "01",
                tr("Apply", "Postulez"),
                tr("Fill out a short confidential form. No real name required.", "Remplissez un court formulaire confidentiel. Aucun vrai nom requis."),
              ],
              [
                "02",
                tr("Join", "Rejoignez"),
                tr("Once verified, you receive access and choose your own display name.", "Une fois vérifié, vous recevez l'accès et choisissez votre propre nom d'affichage."),
              ],
              [
                "03",
                tr("Connect", "Connectez-vous"),
                tr("Participate as much or as little as you want. No pressure.", "Participez autant ou aussi peu que vous le souhaitez. Aucune pression."),
              ],
            ].map(([num, title, body]) => (
              <Card key={num} t={t}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 48,
                    fontWeight: 800,
                    color: t.isDark ? t.card : t.accentLight,
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {num}
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: t.text,
                    marginBottom: 8,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 15,
                    color: t.textMuted,
                    lineHeight: 1.7,
                  }}
                >
                  {body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={s.sectionAlt}>
        <div style={s.inner}>
          <SectionLabel t={t}>{tr("Voices From Campus", "Voix du Campus")}</SectionLabel>
          <h2 style={s.h2}>{tr("What members say", "Ce que disent les membres")}</h2>
          {[
            tr(
              "For the first time since my diagnosis I talked to someone who actually gets it. Not a doctor. Not a counsellor. Someone my age, on a campus, living the same life.",
              "Pour la première fois depuis mon diagnostic, j'ai parlé à quelqu'un qui comprend vraiment. Pas un médecin. Pas un conseiller. Quelqu'un de mon âge, sur un campus, vivant la même vie."
            ),
            tr(
              "I did not even know I had rights as an HIV positive student. The Peer Circle changed that.",
              "Je ne savais même pas que j'avais des droits en tant qu'étudiant séropositif. Le Cercle des Pairs a changé cela."
            ),
          ].map((quote, i) => (
            <div
              key={i}
              style={{
                background: t.card,
                border: `1px solid ${t.borderColor}`,
                borderLeft: `4px solid ${t.accent}`,
                borderRadius: "0 12px 12px 0",
                padding: 32,
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 18,
                  fontStyle: "italic",
                  color: t.text,
                  lineHeight: 1.75,
                  marginBottom: 12,
                }}
              >
                "{quote}"
              </p>
              <p
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: t.accent,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {tr(
                  "LUMA Peer Circle Member · Nigerian University Student · Anonymous",
                  "Membre du Cercle des Pairs LUMA · Étudiant universitaire nigérian · Anonyme"
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* APPLY TO JOIN */}
      <section style={{ background: t.primary, padding: "80px 32px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <SectionLabel t={t}>{tr("Apply to Join", "Postuler pour rejoindre")}</SectionLabel>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(26px,4vw,40px)",
              fontWeight: 800,
              color: t.ivory,
              marginBottom: 12,
            }}
          >
            {tr("Ready to join The Peer Circle?", "Prêt à rejoindre le Cercle des Pairs ?")}
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 14,
              fontStyle: "italic",
              color: "rgba(247,243,236,0.75)",
              lineHeight: 1.7,
              marginBottom: 32,
              padding: "12px 16px",
              background: "rgba(247,243,236,0.08)",
              borderLeft: `3px solid ${t.accent}`,
              borderRadius: "0 8px 8px 0",
            }}
          >
            {tr(
              "Your identity will never be shared. No real name required. This form is seen only by the LUMA team.",
              "Votre identité ne sera jamais partagée. Aucun vrai nom requis. Ce formulaire n'est vu que par l'équipe LUMA."
            )}
          </p>
          {submitted ? (
            <div
              style={{
                background: "rgba(247,243,236,0.12)",
                border: "1px solid rgba(247,243,236,0.25)",
                borderRadius: 12,
                padding: "24px 28px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 16,
                  color: t.ivory,
                  fontWeight: 600,
                }}
              >
                {tr("Application received.", "Candidature reçue.")}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 15,
                  color: "rgba(247,243,236,0.7)",
                  marginTop: 8,
                  lineHeight: 1.6,
                }}
              >
                {tr("We will be in touch within 48 hours. Welcome to LUMA.", "Nous vous contacterons sous 48 heures. Bienvenue chez LUMA.")}
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={s.darkLabel}>
                  {tr(
                    "1. What name would you like to go by in the Peer Circle? (Display name — not your real name.)",
                    "1. Quel nom souhaitez-vous utiliser dans le Cercle des Pairs ? (Nom d'affichage — pas votre vrai nom.)"
                  )}
                </label>
                <Input
                  t={t}
                  placeholder={tr("Your chosen display name", "Le nom d'affichage de votre choix")}
                  value={form.displayName}
                  onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                  style={s.darkInput}
                />
              </div>
              <div>
                <label style={s.darkLabel}>
                  {tr(
                    "2. Your email address (For account access only. Never shown to other members.)",
                    "2. Votre adresse e-mail (Uniquement pour l'accès au compte. Jamais montrée aux autres membres.)"
                  )}
                </label>
                <Input
                  t={t}
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={s.darkInput}
                />
              </div>
              <div>
                <label style={s.darkLabel}>{tr("3. Which university are you currently attending?", "3. Quelle université fréquentez-vous actuellement ?")}</label>
                <Input
                  t={t}
                  placeholder={tr("Name of your university", "Nom de votre université")}
                  value={form.university}
                  onChange={(e) => setForm({ ...form, university: e.target.value })}
                  style={s.darkInput}
                />
              </div>
              <div>
                <label style={s.darkLabel}>{tr("4. What year are you in?", "4. En quelle année êtes-vous ?")}</label>
                <select
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "13px 16px",
                    borderRadius: 10,
                    border: "1.5px solid rgba(247,243,236,0.2)",
                    background: "rgba(255,255,255,0.08)",
                    color: form.year ? t.ivory : "rgba(247,243,236,0.5)",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 15,
                    outline: "none",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                >
                  <option value="" style={{ color: "#222" }}>
                    {tr("Select your year...", "Sélectionnez votre année...")}
                  </option>
                  {YEAR_OPTIONS.map((y) => (
                    <option key={y} value={y} style={{ color: "#222" }}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={s.darkLabel}>
                  {tr(
                    "5. Is there anything you would like us to know before you join? (Optional.)",
                    "5. Y a-t-il quelque chose que vous aimeriez nous dire avant de rejoindre ? (Facultatif.)"
                  )}
                </label>
                <textarea
                  placeholder={tr("Share as much or as little as you want.", "Partagez autant ou aussi peu que vous le souhaitez.")}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "13px 16px",
                    borderRadius: 10,
                    border: "1.5px solid rgba(247,243,236,0.2)",
                    background: "rgba(255,255,255,0.08)",
                    color: t.ivory,
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 15,
                    outline: "none",
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                />
              </div>
              <Btn
                t={t}
                variant="light"
                onClick={handleSubmit}
                style={{ width: "100%", textAlign: "center", opacity: sending ? 0.6 : 1 }}
              >
                {sending ? tr("Sending...", "Envoi...") : tr("Apply to Join", "Postuler pour rejoindre")}
              </Btn>
            </div>
          )}
        </div>
      </section>

      {/* VOICES FROM CAMPUS — STORY SUBMISSION */}
      <section style={{ background: t.bg, padding: "80px 32px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <SectionLabel t={t}>{tr("Voices From Campus", "Voix du Campus")}</SectionLabel>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(26px,4vw,40px)",
              fontWeight: 800,
              color: t.text,
              marginBottom: 12,
            }}
          >
            {tr("Share your story", "Partagez votre histoire")}
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 16,
              color: t.textMuted,
              lineHeight: 1.75,
              marginBottom: 28,
            }}
          >
            {tr(
              "Your story belongs to you. We will never publish it without sending it back to you first. You can share anonymously or with your name. You can share as much or as little as you want. There is no wrong way to do this.",
              "Votre histoire vous appartient. Nous ne la publierons jamais sans vous l'avoir renvoyée au préalable. Vous pouvez la partager anonymement ou avec votre nom. Vous pouvez en partager autant ou aussi peu que vous le souhaitez. Il n'y a pas de mauvaise façon de faire cela."
            )}
          </p>
          {storySent ? (
            <FormSuccess
              t={t}
              message={tr(
                "Story received. Thank you for trusting LUMA with this. We will read it carefully and send you a review copy before anything is published. You will have the final say on everything.",
                "Histoire reçue. Merci d'avoir fait confiance à LUMA. Nous la lirons attentivement et vous enverrons une copie de relecture avant toute publication. Vous aurez le dernier mot sur tout."
              )}
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 13,
                    color: t.textMuted,
                    marginBottom: 10,
                    display: "block",
                    fontWeight: 600,
                  }}
                >
                  {tr("How would you like to be identified?", "Comment souhaitez-vous être identifié ?")}
                </label>
                {[
                  [
                    "Anonymous — my name will not appear anywhere on the story",
                    tr(
                      "Anonymous — my name will not appear anywhere on the story",
                      "Anonyme — mon nom n'apparaîtra nulle part dans l'histoire"
                    ),
                  ],
                  [
                    "Use a chosen name — I will pick a name that is not my real name",
                    tr(
                      "Use a chosen name — I will pick a name that is not my real name",
                      "Utiliser un nom choisi — je choisirai un nom qui n'est pas mon vrai nom"
                    ),
                  ],
                  [
                    "Use my real name — I am happy for my name to appear on the story",
                    tr(
                      "Use my real name — I am happy for my name to appear on the story",
                      "Utiliser mon vrai nom — je suis d'accord pour que mon nom apparaisse dans l'histoire"
                    ),
                  ],
                ].map(([opt, label]) => (
                  <label
                    key={opt}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      padding: "10px 12px",
                      marginBottom: 6,
                      borderRadius: 8,
                      border: `1px solid ${story.identification === opt ? t.accent : t.borderColor}`,
                      background: story.identification === opt ? t.accentLight : "transparent",
                      cursor: "pointer",
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 14,
                      color: t.text,
                      lineHeight: 1.5,
                    }}
                  >
                    <input
                      type="radio"
                      name="story-id"
                      checked={story.identification === opt}
                      onChange={() => setStory({ ...story, identification: opt })}
                      style={{ marginTop: 3 }}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
              {story.identification.startsWith("Use") && (
                <Input
                  t={t}
                  placeholder={tr("The name you want to appear on your story", "Le nom que vous voulez voir apparaître dans votre histoire")}
                  value={story.chosenName}
                  onChange={(e) => setStory({ ...story, chosenName: e.target.value })}
                />
              )}
              <Input
                t={t}
                type="email"
                placeholder={tr("your@email.com (so we can send the review copy)", "votre@email.com (pour vous envoyer la copie de relecture)")}
                value={story.email}
                onChange={(e) => setStory({ ...story, email: e.target.value })}
              />
              <Input
                t={t}
                placeholder={tr("Your university (optional)", "Votre université (facultatif)")}
                value={story.university}
                onChange={(e) => setStory({ ...story, university: e.target.value })}
              />
              <Textarea
                t={t}
                placeholder={tr(
                  "Write as much or as little as you want. There is no minimum or maximum.",
                  "Écrivez autant ou aussi peu que vous le souhaitez. Il n'y a pas de minimum ni de maximum."
                )}
                value={story.story}
                onChange={(e) => setStory({ ...story, story: e.target.value })}
                rows={8}
              />
              <Textarea
                t={t}
                placeholder={tr(
                  "Any instructions or requests you have for the LUMA team... (optional)",
                  "Toute instruction ou demande pour l'équipe LUMA... (facultatif)"
                )}
                value={story.instructions}
                onChange={(e) => setStory({ ...story, instructions: e.target.value })}
                rows={3}
              />
              <Btn
                t={t}
                variant="primary"
                onClick={handleStory}
                style={{ opacity: storySending ? 0.6 : 1 }}
              >
                {storySending ? tr("Sending...", "Envoi...") : tr("Submit My Story", "Envoyer mon histoire")}
              </Btn>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ─── OUR WORK PAGE ────────────────────────────────────────────────────────────

export const WorkPage = ({ t, setPage }) => {
  const { tr } = useLang();
  const pillars = [
    {
      num: "01",
      label: tr("Inform", "Informer"),
      title: tr("Because ignorance is not neutral.", "Parce que l'ignorance n'est pas neutre."),
      body: tr(
        "We do not just deliver HIV information. Nigerian students already have it. We make that information actionable, contextual, and impossible to ignore. Every Campus Truth Series article moves students from knowing to doing.",
        "Nous ne nous contentons pas de transmettre de l'information sur le VIH. Les étudiants nigérians l'ont déjà. Nous rendons cette information actionnable, contextuelle, et impossible à ignorer. Chaque article de la Campus Truth Series fait passer les étudiants du savoir à l'agir.",
      ),
      programs: [
        tr("Campus Truth Series", "Campus Truth Series"),
        tr("The Status Neutral Campus Guide", "Le Guide du campus au statut neutre"),
      ],
      page: "truth",
      dark: false,
    },
    {
      num: "02",
      label: tr("Advocate", "Défendre"),
      title: tr(
        "Policy does not change by itself.",
        "Les politiques ne changent pas d'elles-mêmes.",
      ),
      body: tr(
        "Knowing your rights and exercising your rights are two completely different things. LUMA equips students with the tools, language, and confidence to turn legal knowledge into real protection on their campuses.",
        "Connaître ses droits et les exercer sont deux choses complètement différentes. LUMA équipe les étudiants des outils, du langage et de la confiance nécessaires pour transformer la connaissance juridique en protection réelle sur leurs campus.",
      ),
      programs: [
        tr("Campus Policy Push", "Mobilisation pour la politique de campus"),
        tr("National Prevention Plan Engagement", "Engagement dans le Plan national de prévention"),
        tr("Research to Advocacy Pipeline", "De la recherche au plaidoyer"),
      ],
      page: "advocacy",
      dark: true,
    },
    {
      num: "03",
      label: tr("Belong", "Appartenir"),
      title: tr(
        "You should not have to be alone in this.",
        "Vous ne devriez pas avoir à traverser cela seul.",
      ),
      body: tr(
        "Community is where information becomes knowledge. In the Peer Circle, what students know in theory becomes something they can live with, talk about, and act on together.",
        "C'est dans la communauté que l'information devient connaissance. Dans le Cercle de pairs, ce que les étudiants savent en théorie devient quelque chose qu'ils peuvent vivre, dont ils peuvent parler et sur lequel ils peuvent agir ensemble.",
      ),
      programs: [
        tr("The Peer Circle", "Le Cercle de pairs"),
        tr("Voices From Campus", "Voix du campus"),
      ],
      page: "circle",
      dark: false,
    },
  ];
  const bg0 = { padding: "96px 32px", background: t.bg };
  const bgA = { padding: "96px 32px", background: t.isDark ? t.surface : t.accentLight };
  const bgD = { padding: "96px 32px", background: t.primary };
  return (
    <div>
      <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Tag t={t} light>
            {tr("Our Work", "Notre travail")}
          </Tag>
          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 800,
              color: t.ivory,
              lineHeight: 1.1,
              marginTop: 16,
            }}
          >
            {tr("Three pillars.", "Trois piliers.")}
            <br />
            {tr("One direction.", "Une seule direction.")}
          </h1>
        </div>
      </div>
      {pillars.map((p, i) => (
        <section key={p.num} style={p.dark ? bgD : i % 2 === 0 ? bg0 : bgA}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 100,
                fontWeight: 800,
                color: p.dark ? "rgba(247,243,236,0.06)" : t.isDark ? t.card : t.accentLight,
                lineHeight: 1,
                marginBottom: -16,
                userSelect: "none",
              }}
            >
              {p.num}
            </div>
            <SectionLabel t={p.dark ? { accent: t.accent } : t}>{p.label}</SectionLabel>
            <h2
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(28px,4vw,52px)",
                fontWeight: 800,
                color: p.dark ? t.ivory : t.text,
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              {p.title}
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 17,
                color: p.dark ? "rgba(247,243,236,0.7)" : t.textMuted,
                lineHeight: 1.8,
                maxWidth: 640,
                marginBottom: 24,
              }}
            >
              {p.body}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
              {p.programs.map((prog) => (
                <Tag
                  key={prog}
                  t={
                    p.dark
                      ? {
                          ...t,
                          primary: t.accent,
                          accentLight: "rgba(247,243,236,0.12)",
                          borderColor: "transparent",
                        }
                      : t
                  }
                >
                  {prog}
                </Tag>
              ))}
            </div>
            <Btn t={t} variant={p.dark ? "ghost" : "primary"} onClick={() => setPage(p.page)}>
              {tr("Explore", "Découvrir")} {p.label}
            </Btn>
          </div>
        </section>
      ))}
    </div>
  );
};

// ─── ADVOCACY PAGE ───────────────────────────────────────────────────────────

export const AdvocacyPage = ({ t }) => {
  const { tr } = useLang();
  return (
    <div>
      <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Tag t={t} light>
            {tr("The Advocate Pillar", "Le pilier Défendre")}
          </Tag>
          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 800,
              color: t.ivory,
              lineHeight: 1.1,
              marginTop: 16,
            }}
          >
            {tr(
              "Policy does not change by itself. We push.",
              "Les politiques ne changent pas d'elles-mêmes. Nous poussons.",
            )}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 18,
              color: "rgba(247,243,236,0.7)",
              lineHeight: 1.7,
              maxWidth: 580,
              marginTop: 16,
            }}
          >
            {tr(
              "LUMA advocates for anti-discrimination policies at Nigerian universities and for youth voices in national HIV prevention frameworks.",
              "LUMA milite pour des politiques anti-discrimination dans les universités nigérianes et pour la voix des jeunes dans les cadres nationaux de prévention du VIH.",
            )}
          </p>
        </div>
      </div>
      <section style={{ padding: "80px 32px", background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
            }}
          >
            {[
              {
                level: tr("On Campus", "Sur le campus"),
                body: tr(
                  "Pushing individual universities to adopt formal anti-discrimination policies for HIV positive students and to train campus health staff on status neutral care.",
                  "Encourager chaque université à adopter des politiques anti-discrimination formelles pour les étudiants séropositifs et à former le personnel de santé du campus aux soins à statut neutre.",
                ),
              },
              {
                level: tr("Nationally", "Au niveau national"),
                body: tr(
                  "Feeding university-specific data and youth voices into Nigeria's 2026 to 2030 National HIV Prevention Plan through submissions, partnerships, and evidence briefs.",
                  "Alimenter le Plan national de prévention du VIH 2026-2030 du Nigéria avec des données spécifiques aux universités et la voix des jeunes, via des soumissions, des partenariats et des notes factuelles.",
                ),
              },
              {
                level: tr("Globally", "Au niveau mondial"),
                body: tr(
                  "Using platforms including AIDS 2026, One Young World, and the Y+ LEAP Academy to amplify Nigerian campus HIV realities on the world stage.",
                  "Utiliser des plateformes telles qu'AIDS 2026, One Young World et la Y+ LEAP Academy pour porter les réalités du VIH sur les campus nigérians à l'échelle mondiale.",
                ),
              },
            ].map((a, i) => (
              <Card key={i} t={t}>
                <Tag t={t}>{a.level}</Tag>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 16,
                    color: t.textMuted,
                    lineHeight: 1.75,
                    marginTop: 16,
                  }}
                >
                  {a.body}
                </p>
              </Card>
            ))}
          </div>
          <div style={{ marginTop: 64 }}>
            <SectionLabel t={t}>
              {tr("We Advocate With Data", "Nous militons avec des données")}
            </SectionLabel>
            <h2
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(26px,3.5vw,42px)",
                fontWeight: 800,
                color: t.text,
                marginBottom: 20,
              }}
            >
              {tr("Our evidence base", "Notre base de données probantes")}
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 17,
                color: t.textMuted,
                lineHeight: 1.8,
                maxWidth: 680,
              }}
            >
              {tr(
                "LUMA's advocacy is grounded in two ongoing research studies. Our research has found a critical knowledge-attitude paradox: 96.85% of university students demonstrate high HIV knowledge, yet only 55.5% hold positive attitudes toward people living with HIV. Knowledge alone is not enough. Policy change is required.",
                "Le plaidoyer de LUMA s'appuie sur deux études de recherche en cours. Nos recherches ont mis en évidence un paradoxe critique entre connaissance et attitude : 96,85 % des étudiants universitaires font preuve d'une haute connaissance du VIH, mais seulement 55,5 % ont des attitudes positives envers les personnes vivant avec le VIH. La connaissance seule ne suffit pas. Un changement de politique est nécessaire.",
              )}
            </p>
          </div>
          <div
            style={{
              marginTop: 48,
              background: t.isDark ? t.card : t.accentLight,
              border: `1px solid ${t.borderColor}`,
              borderRadius: 16,
              padding: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <Tag t={t}>{tr("Active Campaign", "Campagne active")}</Tag>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: t.text,
                    marginTop: 12,
                    marginBottom: 8,
                  }}
                >
                  {tr(
                    "The Status Neutral Campus Initiative",
                    "L'Initiative Campus au statut neutre",
                  )}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 15,
                    color: t.textMuted,
                    lineHeight: 1.7,
                    maxWidth: 560,
                  }}
                >
                  {tr(
                    "A push for Nigerian universities to adopt status neutral HIV service frameworks in their campus health centres, beginning with Kwara State University as a pilot institution.",
                    "Une initiative pour que les universités nigérianes adoptent des cadres de services VIH à statut neutre dans leurs centres de santé de campus, en commençant par la Kwara State University comme établissement pilote.",
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── RESOURCES PAGE ───────────────────────────────────────────────────────────

export const ResourcesPage = ({ t }) => {
  const { lang, tr } = useLang();
  const setPage = useNavToPage();
  return (
    <div>
      <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Tag t={t} light>
            {tr("Resources", "Ressources")}
          </Tag>
          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 800,
              color: t.ivory,
              lineHeight: 1.1,
              marginTop: 16,
            }}
          >
            {tr("Everything you need to know.", "Tout ce que vous devez savoir.")}
            <br />
            {tr("In one place.", "En un seul endroit.")}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 18,
              color: "rgba(247,243,236,0.7)",
              lineHeight: 1.7,
              maxWidth: 620,
              marginTop: 16,
            }}
          >
            {tr(
              "Every resource in this library is built around one question: not what do you know, but what will you do with it?",
              "Chaque ressource de cette bibliothèque part d'une seule question : non pas que savez-vous, mais qu'allez-vous en faire ?",
            )}
          </p>
        </div>
      </div>
      <section style={{ padding: "80px 32px", background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
            }}
          >
            {Object.entries(GUIDES).map(([id, g]) => (
              <Card
                key={id}
                t={t}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onClick={() => setPage("guide:" + id)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontSize: 19,
                      fontWeight: 700,
                      color: t.text,
                      marginBottom: 12,
                    }}
                  >
                    {lang === "fr" ? g.titleFr : g.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 15,
                      color: t.textMuted,
                      lineHeight: 1.7,
                      marginBottom: 20,
                    }}
                  >
                    {lang === "fr" ? g.bodyFr : g.body}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: t.accent,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {tr("Read Guide", "Lire le Guide")} <ArrowRight color={t.accent} size={12} />
                  </span>
                  <a
                    href={g.asset}
                    download={g.filename}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: t.textMuted,
                    }}
                  >
                    {tr("Download", "Télécharger")} ↓
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* POLICY SHIELD — Student Rights Handout */}
      <section style={{ padding: "80px 32px", background: t.isDark ? t.surface : t.accentLight }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel t={t}>Policy Shield</SectionLabel>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(26px,3.5vw,42px)",
              fontWeight: 800,
              color: t.text,
              marginTop: 8,
              marginBottom: 12,
            }}
          >
            Student Rights Handout
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 16,
              color: t.textMuted,
              lineHeight: 1.7,
              maxWidth: 640,
              marginBottom: 40,
            }}
          >
            What every Nigerian higher institution student is legally entitled to, summarised for
            quick reference.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 20,
            }}
          >
            {[
              [
                "1. Admission & Retention",
                "No higher institution in Nigeria (Federal, State, or Private) can deny you entry, suspend, or expel you because of a positive HIV classification. Retaliatory expulsions are unlawful under Section 21 of the HIV/AIDS Anti-Discrimination Act of 2014.",
              ],
              [
                "2. Medical Confidentiality",
                "Your campus clinical records are strictly protected. Doctors, nurses, and lab scientists at your campus clinic are legally required to guard your diagnostic details. Leakages to lecturers, hostel wardens, or colleagues can result in licensing termination.",
              ],
              [
                "3. Exam & Project Extensions",
                "If physical fatigue, clinical onboarding side-effects, or mental stress impact your exam schedules, you are entitled to seek official medical course extensions or temporary deferment through your department without disclosing private diagnoses publicly.",
              ],
              [
                "4. Free Care Integration",
                "Under the 2026 National Health Guidelines, public and federal clinics must serve as cost-free distribution centres for antiretroviral therapy (ART), PrEP regimes, and standard viral count reviews. Any illegal levy demands should be logged with support groups.",
              ],
            ].map(([title, body], i) => (
              <Card key={i} t={t} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: t.primary,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 14,
                    color: t.textMuted,
                    lineHeight: 1.7,
                  }}
                >
                  {body}
                </p>
              </Card>
            ))}
          </div>

          <div
            style={{
              marginTop: 40,
              padding: 32,
              background: t.card,
              border: `1px solid ${t.borderColor}`,
              borderLeft: `4px solid ${t.accent}`,
              borderRadius: "0 12px 12px 0",
            }}
          >
            <h3
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: t.text,
                marginBottom: 10,
              }}
            >
              How to Document Violations
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 15,
                color: t.textMuted,
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              If you experience discrimination on campus, have had your medical privacy breached by
              health centre personnel, or have been threatened with disciplinary action due to
              status details, please compile:
            </p>
            <ul
              style={{
                paddingLeft: 20,
                marginBottom: 16,
                color: t.text,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 15,
                lineHeight: 1.9,
              }}
            >
              <li>
                <strong>Timestamps:</strong> The exact date, hour, and academic semester the
                exchange occurred.
              </li>
              <li>
                <strong>Witnesses:</strong> Students or coordinators who observed the discriminatory
                conversation.
              </li>
              <li>
                <strong>Written materials:</strong> Letters, text messages, status verification
                demands, or emails from administrative channels.
              </li>
            </ul>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: t.textMuted }}>
              Submit confidentially to{" "}
              <strong style={{ color: t.accent }}>luma.nigeria@gmail.com</strong> to coordinate with
              the Legal Shield network.
            </p>
          </div>
        </div>
      </section>

      {/* HEALTH DIRECTORY */}
      <section style={{ padding: "80px 32px", background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel t={t}>Find Care Near You</SectionLabel>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(26px,3.5vw,42px)",
              fontWeight: 800,
              color: t.text,
              marginTop: 8,
              marginBottom: 12,
            }}
          >
            National Health Directory
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 16,
              color: t.textMuted,
              lineHeight: 1.7,
              maxWidth: 720,
              marginBottom: 40,
            }}
          >
            Registered and PEPFAR-funded medical institutions offering anonymous diagnostics,
            counselling, free antiretroviral therapy (ART) distribution, and PrEP prescriptions near
            major Nigerian university campuses.
          </p>
          <div style={{ display: "grid", gap: 20 }}>
            {[
              {
                region: "KWARA STATE REGION (Near KWASU & UNILORIN)",
                name: "Kwara State University Health Centre & Referral Network",
                loc: "Malete, Kwara State",
                desc: "Confidential pre/post-test sessions and quick referral channels to General Hospital Ilorin for continuous antiretroviral regimen collection.",
                contact: "Care Desk Referral",
              },
              {
                region: "LAGOS REGION (Near UNILAG & LASU)",
                name: "Lagos University Teaching Hospital (LUTH) — AIDS Care Unit",
                loc: "Idi-Araba, Surulere, Lagos",
                desc: "Primary regional resource with full viral load tracking equipment, status-neutral counselling circles, and PEP/PrEP medication reserves.",
                contact: "Special Care Desk A6",
              },
              {
                region: "SOUTH-EAST REGION (Near EBSU, UNN & FUTO)",
                name: "Ebonyi State University Clinical Health Centre",
                loc: "Abakaliki Campus, Ebonyi State",
                desc: "Peer health initiatives and rapid screening tests. Directly integrated with PEPFAR advocacy pathways to support newly diagnosed young students.",
                contact: "Student Counsellor Unit",
              },
            ].map((c, i) => (
              <Card key={i} t={t} style={{ padding: 28 }}>
                <p
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    color: t.accent,
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {c.region}
                </p>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: t.text,
                    marginBottom: 4,
                  }}
                >
                  {c.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 13,
                    color: t.textMuted,
                    marginBottom: 12,
                  }}
                >
                  {c.loc}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 15,
                    color: t.text,
                    lineHeight: 1.7,
                    marginBottom: 12,
                  }}
                >
                  {c.desc}
                </p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: t.textMuted }}>
                  Contact: <strong style={{ color: t.text }}>{c.contact}</strong>
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── GET INVOLVED PAGE ────────────────────────────────────────────────────────

export const InvolvePage = ({ t, setPage }) => {
  const { tr } = useLang();
  const ways = [
    {
      title: tr("Join The Peer Circle", "Rejoindre le Cercle de Pairs"),
      body: tr(
        "For Nigerian university students living with HIV who want peer community and support.",
        "Pour les étudiants universitaires nigérians vivant avec le VIH qui souhaitent une communauté et un soutien entre pairs.",
      ),
      cta: tr("Apply to Join", "Postuler"),
      target: "circle",
    },
    {
      title: tr("Campus Ambassador", "Ambassadeur de Campus"),
      body: tr(
        "Be the first LUMA presence on your campus. No prior HIV advocacy experience required.",
        "Soyez la première présence LUMA sur votre campus. Aucune expérience préalable requise.",
      ),
      cta: tr("Apply as Ambassador", "Postuler comme Ambassadeur"),
      target: "ambassador",
    },
    {
      title: tr("Volunteer", "Bénévole"),
      body: tr(
        "Content, research, design, translation, social media. Bring a skill to LUMA.",
        "Contenu, recherche, design, traduction, réseaux sociaux. Apportez une compétence à LUMA.",
      ),
      cta: tr("Get In Touch", "Contactez-nous"),
      target: "volunteer",
    },
    {
      title: tr("Partner With LUMA", "Devenir Partenaire"),
      body: tr(
        "Organisations, research institutions, or campus health programmes that share our values.",
        "Organisations, institutions de recherche ou programmes de santé partageant nos valeurs.",
      ),
      cta: tr("Start a Conversation", "Démarrer une conversation"),
      target: "partner",
    },
  ];

  return (
    <div>
      <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Tag t={t} light>
            {tr("Get Involved", "S'impliquer")}
          </Tag>
          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 800,
              color: t.ivory,
              lineHeight: 1.1,
              marginTop: 16,
            }}
          >
            {tr(
              "Join LUMA and help turn HIV knowledge into HIV action on Nigerian campuses.",
              "Rejoignez LUMA et aidez à transformer les connaissances sur le VIH en actions concrètes sur les campus nigérians.",
            )}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 18,
              color: "rgba(247,243,236,0.7)",
              lineHeight: 1.7,
              maxWidth: 600,
              marginTop: 16,
            }}
          >
            {tr(
              "Choose how you want to be part of LUMA. Each option has its own short application.",
              "Choisissez comment vous souhaitez faire partie de LUMA. Chaque option a son propre formulaire.",
            )}
          </p>
        </div>
      </div>
      <section style={{ padding: "80px 32px", background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 24,
            }}
          >
            {ways.map((w, i) => (
              <Card
                key={i}
                t={t}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: t.text,
                      marginBottom: 12,
                    }}
                  >
                    {w.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 15,
                      color: t.textMuted,
                      lineHeight: 1.7,
                      marginBottom: 24,
                    }}
                  >
                    {w.body}
                  </p>
                </div>
                <Btn t={t} variant="primary" onClick={() => setPage(w.target)}>
                  {w.cta}
                </Btn>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── FORM PAGE SHARED HELPERS ─────────────────────────────────────────────────

const formNoteStyle = (t) => ({
  fontFamily: "'DM Sans',sans-serif",
  fontSize: 14,
  fontStyle: "italic",
  color: t.textMuted,
  lineHeight: 1.7,
  marginBottom: 28,
  padding: "12px 16px",
  background: t.isDark ? t.card : t.accentLight,
  borderLeft: `3px solid ${t.accent}`,
  borderRadius: "0 8px 8px 0",
  maxWidth: 720,
});
const formLabelStyle = (t) => ({
  fontFamily: "'DM Sans',sans-serif",
  fontSize: 13,
  fontWeight: 600,
  color: t.text,
  marginBottom: 6,
  display: "block",
});
const FormField = ({ t, label, children, full }) => (
  <div style={full ? { gridColumn: "1 / -1" } : undefined}>
    <label style={formLabelStyle(t)}>{label}</label>
    {children}
  </div>
);

const FormPageShell = ({ t, eyebrow, title, intro, children, backTo = "involve", setPage }) => (
  <div>
    <div style={{ background: t.primary, padding: "100px 32px 64px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <button
          onClick={() => setPage(backTo)}
          style={{
            background: "none",
            border: "none",
            color: "rgba(247,243,236,0.75)",
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 16,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <ArrowLeft color="rgba(247,243,236,0.75)" size={14} /> {useLang().tr("Back", "Retour")}
        </button>
        <Tag t={t} light>
          {eyebrow}
        </Tag>
        <h1
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: "clamp(32px,4.5vw,52px)",
            fontWeight: 800,
            color: t.ivory,
            lineHeight: 1.15,
            marginTop: 16,
          }}
        >
          {title}
        </h1>
        {intro && (
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 17,
              color: "rgba(247,243,236,0.75)",
              lineHeight: 1.7,
              maxWidth: 620,
              marginTop: 16,
            }}
          >
            {intro}
          </p>
        )}
      </div>
    </div>
    <section style={{ padding: "64px 32px 96px", background: t.bg }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>{children}</div>
    </section>
  </div>
);

// ─── AMBASSADOR FORM PAGE ─────────────────────────────────────────────────────

export const AmbassadorFormPage = ({ t, setPage }) => {
  const { tr } = useLang();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    year: "",
    course: "",
    why: "",
    firstMonth: "",
    experience: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const submit = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.university ||
      !form.year ||
      !form.course ||
      !form.why ||
      !form.firstMonth
    )
      return;
    setSending(true);
    await submitToEmail("Campus Ambassador Application", {
      "Full Name": form.name,
      Email: form.email,
      "WhatsApp Number": form.phone || "(not provided)",
      University: form.university,
      Year: form.year,
      "Course of Study": form.course,
      "Why be a LUMA ambassador": form.why,
      "First month plan": form.firstMonth,
      "Prior experience": form.experience || "(none stated)",
    });
    setSending(false);
    setSent(true);
  };
  return (
    <FormPageShell
      t={t}
      setPage={setPage}
      eyebrow={tr("Application · Campus Ambassador", "Candidature · Ambassadeur de Campus")}
      title={tr(
        "Be the first LUMA presence on your campus",
        "Soyez la première présence LUMA sur votre campus",
      )}
      intro={tr(
        "No prior HIV advocacy experience required. Just the belief that every student deserves better.",
        "Aucune expérience préalable en plaidoyer VIH requise. Juste la conviction que chaque étudiant mérite mieux.",
      )}
    >
      {sent ? (
        <FormSuccess
          t={t}
          message={tr(
            "Application received. We will review it and be in touch within five working days.",
            "Candidature reçue. Nous l'examinerons et vous répondrons sous cinq jours ouvrables.",
          )}
        />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 16,
          }}
        >
          <FormField t={t} label={tr("1. Your full name", "1. Votre nom complet")}>
            <Input
              t={t}
              placeholder={tr("Full name", "Nom complet")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </FormField>
          <FormField t={t} label={tr("2. Your email address", "2. Votre adresse e-mail")}>
            <Input
              t={t}
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </FormField>
          <FormField
            t={t}
            label={tr(
              "3. Your WhatsApp number (Optional)",
              "3. Votre numéro WhatsApp (Facultatif)",
            )}
          >
            <Input
              t={t}
              placeholder="WhatsApp"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </FormField>
          <FormField
            t={t}
            label={tr(
              "4. Which university do you attend?",
              "4. Quelle université fréquentez-vous ?",
            )}
          >
            <Input
              t={t}
              placeholder={tr("Name of your university", "Nom de votre université")}
              value={form.university}
              onChange={(e) => setForm({ ...form, university: e.target.value })}
            />
          </FormField>
          <FormField t={t} label={tr("5. What year are you in?", "5. En quelle année êtes-vous ?")}>
            <Select
              t={t}
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            >
              <option value="">{tr("Select your year...", "Sélectionnez...")}</option>
              {YEAR_OPTIONS.filter((y) => y !== "Prefer not to say").map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField
            t={t}
            label={tr("6. What is your course of study?", "6. Quelle est votre filière d'étude ?")}
          >
            <Input
              t={t}
              placeholder={tr("e.g. Medicine, Law", "ex. Médecine, Droit")}
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
            />
          </FormField>
          <FormField
            t={t}
            full
            label={tr(
              "7. Why do you want to be a LUMA campus ambassador? (2 to 4 sentences)",
              "7. Pourquoi voulez-vous être ambassadeur LUMA ? (2 à 4 phrases)",
            )}
          >
            <Textarea
              t={t}
              value={form.why}
              onChange={(e) => setForm({ ...form, why: e.target.value })}
              rows={4}
            />
          </FormField>
          <FormField
            t={t}
            full
            label={tr(
              "8. What is one concrete thing you would do in your first month?",
              "8. Quelle action concrète feriez-vous le premier mois ?",
            )}
          >
            <Textarea
              t={t}
              value={form.firstMonth}
              onChange={(e) => setForm({ ...form, firstMonth: e.target.value })}
              rows={4}
            />
          </FormField>
          <FormField
            t={t}
            full
            label={tr(
              "9. Have you done any student activism, health advocacy, or community work before? (Optional)",
              "9. Avez-vous déjà fait du militantisme étudiant ou du plaidoyer ? (Facultatif)",
            )}
          >
            <Textarea
              t={t}
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              rows={3}
            />
          </FormField>
          <div style={{ gridColumn: "1 / -1" }}>
            <Btn t={t} variant="primary" onClick={submit} style={{ opacity: sending ? 0.6 : 1 }}>
              {sending
                ? tr("Sending...", "Envoi...")
                : tr("Submit Application", "Envoyer ma candidature")}
            </Btn>
          </div>
        </div>
      )}
    </FormPageShell>
  );
};

// ─── VOLUNTEER FORM PAGE ──────────────────────────────────────────────────────

export const VolunteerFormPage = ({ t, setPage }) => {
  const { tr } = useLang();
  const VOL_SKILLS = [
    "Content Writing",
    "Graphic Design",
    "Research",
    "Social Media",
    "Translation",
    "Video or Photography",
    "Web Development",
    "Mental Health Support",
    "Other",
  ];
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
    skill: "",
    experience: "",
    hours: "",
    interest: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const submit = async () => {
    if (!form.name || !form.email || !form.skill || !form.experience || !form.hours) return;
    setSending(true);
    await submitToEmail("Volunteer Application", {
      "Full Name": form.name,
      Email: form.email,
      "WhatsApp Number": form.phone || "(not provided)",
      "University or Institution": form.institution || "(not applicable)",
      "Skill / Area": form.skill,
      Experience: form.experience,
      "Hours per week": form.hours,
      "Specific interest": form.interest || "(none)",
    });
    setSending(false);
    setSent(true);
  };
  return (
    <FormPageShell
      t={t}
      setPage={setPage}
      eyebrow={tr("Application · Volunteer", "Candidature · Bénévole")}
      title={tr("Bring your skill to LUMA", "Apportez votre talent à LUMA")}
      intro={tr(
        "LUMA is built by people who care. Whatever your skill, there is a place for it here.",
        "LUMA est construit par des personnes engagées. Quelle que soit votre compétence, il y a une place pour vous.",
      )}
    >
      {sent ? (
        <FormSuccess
          t={t}
          message={tr(
            "We have received your message. We will reach out within 48 hours.",
            "Nous avons reçu votre message. Nous vous contacterons sous 48 heures.",
          )}
        />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 16,
          }}
        >
          <FormField t={t} label={tr("1. Your full name", "1. Votre nom complet")}>
            <Input
              t={t}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </FormField>
          <FormField t={t} label={tr("2. Your email address", "2. Votre adresse e-mail")}>
            <Input
              t={t}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </FormField>
          <FormField
            t={t}
            label={tr(
              "3. Your WhatsApp number (Optional)",
              "3. Votre numéro WhatsApp (Facultatif)",
            )}
          >
            <Input
              t={t}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </FormField>
          <FormField
            t={t}
            label={tr(
              "4. Which university or institution? (If applicable)",
              "4. Quelle université ou institution ? (Si applicable)",
            )}
          >
            <Input
              t={t}
              value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
            />
          </FormField>
          <FormField
            t={t}
            full
            label={tr(
              "5. What skill or area do you want to volunteer in?",
              "5. Dans quel domaine souhaitez-vous être bénévole ?",
            )}
          >
            <Select
              t={t}
              value={form.skill}
              onChange={(e) => setForm({ ...form, skill: e.target.value })}
            >
              <option value="">{tr("Select a skill area...", "Sélectionnez...")}</option>
              {VOL_SKILLS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField
            t={t}
            full
            label={tr(
              "6. Tell us about your experience. (2 to 3 sentences)",
              "6. Parlez-nous de votre expérience. (2 à 3 phrases)",
            )}
          >
            <Textarea
              t={t}
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              rows={3}
            />
          </FormField>
          <FormField
            t={t}
            label={tr(
              "7. How many hours per week can you commit?",
              "7. Combien d'heures par semaine pouvez-vous engager ?",
            )}
          >
            <Input
              t={t}
              placeholder={tr("e.g. 3 to 5 hours", "ex. 3 à 5 heures")}
              value={form.hours}
              onChange={(e) => setForm({ ...form, hours: e.target.value })}
            />
          </FormField>
          <FormField
            t={t}
            full
            label={tr(
              "8. Anything specific you want to work on? (Optional)",
              "8. Un sujet spécifique en tête ? (Facultatif)",
            )}
          >
            <Textarea
              t={t}
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
              rows={3}
            />
          </FormField>
          <div style={{ gridColumn: "1 / -1" }}>
            <Btn t={t} variant="primary" onClick={submit} style={{ opacity: sending ? 0.6 : 1 }}>
              {sending ? tr("Sending...", "Envoi...") : tr("Get In Touch", "Envoyer")}
            </Btn>
          </div>
        </div>
      )}
    </FormPageShell>
  );
};

// ─── PARTNER FORM PAGE ────────────────────────────────────────────────────────

export const PartnerFormPage = ({ t, setPage }) => {
  const { tr } = useLang();
  const ORG_TYPES = [
    "University or Academic Institution",
    "Health Organisation",
    "NGO or Civil Society",
    "Research Institution",
    "Government Agency",
    "Corporate or Private Sector",
    "Media or Communications",
    "Other",
  ];
  const PARTNERSHIP_TYPES = [
    "Research Collaboration",
    "Programme Partnership",
    "Campus Outreach",
    "Funding or Sponsorship",
    "Media or Communications",
    "Content or Knowledge Sharing",
    "Other",
  ];
  const [form, setForm] = useState({
    name: "",
    role: "",
    org: "",
    email: "",
    link: "",
    orgType: "",
    country: "",
    partnership: "",
    about: "",
    project: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const submit = async () => {
    if (
      !form.name ||
      !form.role ||
      !form.org ||
      !form.email ||
      !form.orgType ||
      !form.country ||
      !form.partnership ||
      !form.about
    )
      return;
    setSending(true);
    await submitToEmail("Partnership Enquiry", {
      "Full Name": form.name,
      "Role / Title": form.role,
      Organisation: form.org,
      "Organisation Email": form.email,
      "Website / Social Link": form.link || "(not provided)",
      "Organisation Type": form.orgType,
      Country: form.country,
      "Partnership Interest": form.partnership,
      "About / Why partner": form.about,
      "Specific project": form.project || "(none)",
    });
    setSending(false);
    setSent(true);
  };
  return (
    <FormPageShell
      t={t}
      setPage={setPage}
      eyebrow={tr("Application · Partner With LUMA", "Candidature · Partenariat")}
      title={tr("Start a partnership conversation", "Démarrer une conversation de partenariat")}
      intro={tr(
        "LUMA welcomes partnerships with organisations, institutions, and programmes that share our commitment to HIV-positive students on Nigerian campuses.",
        "LUMA accueille les partenariats avec des organisations partageant notre engagement envers les étudiants séropositifs sur les campus nigérians.",
      )}
    >
      {sent ? (
        <FormSuccess
          t={t}
          message={tr(
            "Thank you for reaching out. We will review your message and respond within five working days.",
            "Merci de nous avoir contactés. Nous répondrons sous cinq jours ouvrables.",
          )}
        />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 16,
          }}
        >
          <FormField t={t} label={tr("1. Your full name", "1. Votre nom complet")}>
            <Input
              t={t}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </FormField>
          <FormField t={t} label={tr("2. Your role or title", "2. Votre rôle ou titre")}>
            <Input
              t={t}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </FormField>
          <FormField t={t} label={tr("3. Organisation name", "3. Nom de l'organisation")}>
            <Input
              t={t}
              value={form.org}
              onChange={(e) => setForm({ ...form, org: e.target.value })}
            />
          </FormField>
          <FormField t={t} label={tr("4. Organisation email", "4. E-mail de l'organisation")}>
            <Input
              t={t}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </FormField>
          <FormField
            t={t}
            full
            label={tr(
              "5. Website or social media link (Optional)",
              "5. Site web ou lien réseau social (Facultatif)",
            )}
          >
            <Input
              t={t}
              placeholder="https://..."
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />
          </FormField>
          <FormField
            t={t}
            label={tr("6. What type of organisation are you?", "6. Quel type d'organisation ?")}
          >
            <Select
              t={t}
              value={form.orgType}
              onChange={(e) => setForm({ ...form, orgType: e.target.value })}
            >
              <option value="">{tr("Select organisation type...", "Sélectionnez...")}</option>
              {ORG_TYPES.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField
            t={t}
            label={tr("7. Which country are you based in?", "7. Dans quel pays êtes-vous basé ?")}
          >
            <Input
              t={t}
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </FormField>
          <FormField
            t={t}
            full
            label={tr(
              "8. What kind of partnership are you interested in?",
              "8. Quel type de partenariat vous intéresse ?",
            )}
          >
            <Select
              t={t}
              value={form.partnership}
              onChange={(e) => setForm({ ...form, partnership: e.target.value })}
            >
              <option value="">{tr("Select partnership type...", "Sélectionnez...")}</option>
              {PARTNERSHIP_TYPES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField
            t={t}
            full
            label={tr(
              "9. Tell us about your organisation and why you want to partner with LUMA. (4 to 6 sentences)",
              "9. Parlez-nous de votre organisation et de votre intérêt pour LUMA. (4 à 6 phrases)",
            )}
          >
            <Textarea
              t={t}
              value={form.about}
              onChange={(e) => setForm({ ...form, about: e.target.value })}
              rows={6}
            />
          </FormField>
          <FormField
            t={t}
            full
            label={tr(
              "10. Is there a specific project you have in mind? (Optional)",
              "10. Avez-vous un projet spécifique en tête ? (Facultatif)",
            )}
          >
            <Textarea
              t={t}
              value={form.project}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
              rows={4}
            />
          </FormField>
          <div style={{ gridColumn: "1 / -1" }}>
            <Btn t={t} variant="primary" onClick={submit} style={{ opacity: sending ? 0.6 : 1 }}>
              {sending
                ? tr("Sending...", "Envoi...")
                : tr("Start a Conversation", "Démarrer la conversation")}
            </Btn>
          </div>
        </div>
      )}
    </FormPageShell>
  );
};

// ─── GUIDE PAGE (PDF READER + DOWNLOAD) ───────────────────────────────────────

export const GuidePage = ({ t, guideId, setPage }) => {
  const { lang, tr } = useLang();
  const guide = GUIDES[guideId];
  if (!guide) {
    return (
      <div style={{ padding: "120px 32px", background: t.bg, textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 32,
            color: t.text,
            marginBottom: 16,
          }}
        >
          {tr("Guide not found", "Guide introuvable")}
        </h1>
        <Btn t={t} onClick={() => setPage("resources")}>
          {tr("Back to Resources", "Retour aux Ressources")}
        </Btn>
      </div>
    );
  }
  const title = lang === "fr" ? guide.titleFr : guide.title;
  const body = lang === "fr" ? guide.bodyFr : guide.body;
  const url = guide.asset;
  const others = Object.entries(GUIDES)
    .filter(([id]) => id !== guideId)
    .slice(0, 3);

  return (
    <div>
      <div style={{ background: t.primary, padding: "100px 32px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <button
            onClick={() => setPage("resources")}
            style={{
              background: "none",
              border: "none",
              color: "rgba(247,243,236,0.75)",
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <ArrowLeft color="rgba(247,243,236,0.75)" size={14} />{" "}
            {tr("All guides", "Tous les guides")}
          </button>
          <Tag t={t} light>
            {tr("LUMA Guide", "Guide LUMA")}
          </Tag>
          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(32px,4.5vw,52px)",
              fontWeight: 800,
              color: t.ivory,
              lineHeight: 1.15,
              marginTop: 16,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 17,
              color: "rgba(247,243,236,0.75)",
              lineHeight: 1.7,
              maxWidth: 620,
              marginTop: 16,
            }}
          >
            {body}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <a
              href={url}
              download={guide.filename}
              style={{
                background: t.ivory,
                color: t.primary,
                padding: "13px 24px",
                borderRadius: 100,
                fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {tr("Download PDF", "Télécharger le PDF")}
            </a>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "transparent",
                color: t.ivory,
                padding: "13px 24px",
                borderRadius: 100,
                fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 700,
                fontSize: 14,
                border: "2px solid rgba(247,243,236,0.4)",
              }}
            >
              {tr("Open in new tab", "Ouvrir dans un onglet")}
            </a>
          </div>
        </div>
      </div>
      <section style={{ padding: "48px 32px 32px", background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              background: t.card,
              border: `1px solid ${t.borderColor}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <iframe
              src={url}
              title={title}
              style={{
                width: "100%",
                height: "85vh",
                minHeight: 600,
                border: "none",
                display: "block",
                background: "#fff",
              }}
            />
          </div>
        </div>
      </section>
      <section style={{ padding: "48px 32px 96px", background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel t={t}>{tr("Continue Reading", "Continuer la lecture")}</SectionLabel>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: t.text,
              marginTop: 8,
              marginBottom: 28,
            }}
          >
            {tr("Other guides", "Autres guides")}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 20,
            }}
          >
            {others.map(([id, g]) => (
              <Card
                key={id}
                t={t}
                style={{ cursor: "pointer" }}
                onClick={() => setPage("guide:" + id)}
              >
                <h3
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: t.text,
                    marginBottom: 10,
                  }}
                >
                  {lang === "fr" ? g.titleFr : g.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 14,
                    color: t.textMuted,
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {lang === "fr" ? g.bodyFr : g.body}
                </p>
                <span
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: t.accent,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {tr("Read guide", "Lire le guide")} <ArrowRight color={t.accent} size={12} />
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── CONTACT PAGE ────────────────────────────────────────────────────────────

export const ContactPage = ({ t, preSubject = "" }) => {
  const { tr } = useLang();
  const subjects = [
    tr("General Enquiry", "Demande générale"),
    tr("Partnership Enquiry", "Demande de partenariat"),
    tr("Submit a Myth", "Soumettre un mythe"),
    tr("Campus Ambassador Application", "Candidature Ambassadeur de campus"),
    tr("Media and Press", "Médias et presse"),
    tr("Research Collaboration", "Collaboration de recherche"),
    tr("Donor or Funding Enquiry", "Demande de don ou de financement"),
    tr("Other", "Autre"),
  ];
  const anonSubjects = [
    tr("General Question", "Question générale"),
    tr("Submit a Myth", "Soumettre un mythe"),
    tr("Peer Circle Enquiry", "Demande sur le Cercle de pairs"),
    tr("Campus Situation", "Situation sur le campus"),
    tr("Research or Data", "Recherche ou données"),
    tr("Other", "Autre"),
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: preSubject || subjects[0],
    message: "",
  });
  const [anonForm, setAnonForm] = useState({ subject: anonSubjects[0], message: "" });
  const [sent, setSent] = useState(false);
  const [anonSent, setAnonSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [anonSending, setAnonSending] = useState(false);

  const handleSend = async () => {
    if (!form.email || !form.message || form.message.trim().length < 20) return;
    setSending(true);
    await submitToEmail(`Contact — ${form.subject}`, {
      Name: form.name || "(not provided)",
      Email: form.email,
      Subject: form.subject,
      Message: form.message,
    });
    setSending(false);
    setSent(true);
  };

  const handleAnon = async () => {
    if (!anonForm.message || anonForm.message.trim().length < 10) return;
    setAnonSending(true);
    await submitToEmail(`ANONYMOUS — ${anonForm.subject}`, {
      Subject: anonForm.subject,
      Message: anonForm.message,
    });
    setAnonSending(false);
    setAnonSent(true);
  };

  return (
    <div>
      <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Tag t={t} light>
            {tr("Contact", "Contact")}
          </Tag>
          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 800,
              color: t.ivory,
              lineHeight: 1.1,
              marginTop: 16,
            }}
          >
            {tr("We are here. Talk to us.", "Nous sommes là. Parlez-nous.")}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 18,
              color: "rgba(247,243,236,0.7)",
              lineHeight: 1.7,
              maxWidth: 560,
              marginTop: 16,
            }}
          >
            {tr(
              "Whether you have a question, a collaboration idea, a myth to submit, or just need to reach someone who gets it, we want to hear from you. We read every message and respond to everything. Give us up to 48 hours.",
              "Que vous ayez une question, une idée de collaboration, un mythe à soumettre, ou que vous ayez simplement besoin de parler à quelqu'un qui comprend, nous voulons vous entendre. Nous lisons chaque message et répondons à tout. Laissez-nous jusqu'à 48 heures.",
            )}
          </p>
        </div>
      </div>
      <section style={{ padding: "80px 32px", background: t.bg }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 64,
          }}
        >
          <div>
            <SectionLabel t={t}>{tr("Send a Message", "Envoyer un message")}</SectionLabel>
            <h2
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 26,
                fontWeight: 700,
                color: t.text,
                marginBottom: 28,
              }}
            >
              {tr("General contact", "Contact général")}
            </h2>
            {sent ? (
              <FormSuccess
                t={t}
                message={tr(
                  "Message sent. We read everything and we will be in touch within 48 hours. Thank you for reaching out to LUMA.",
                  "Message envoyé. Nous lisons tout et vous répondrons sous 48 heures. Merci d'avoir contacté LUMA.",
                )}
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Input
                  t={t}
                  placeholder={tr("Your name (optional)", "Votre nom (facultatif)")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Input
                  t={t}
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Select
                  t={t}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                >
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
                <Textarea
                  t={t}
                  placeholder={tr(
                    "Tell us what is on your mind... (minimum 20 characters)",
                    "Dites-nous ce que vous avez en tête... (20 caractères minimum)",
                  )}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <Btn
                  t={t}
                  variant="primary"
                  onClick={handleSend}
                  style={{ opacity: sending ? 0.6 : 1 }}
                >
                  {sending
                    ? tr("Sending...", "Envoi en cours...")
                    : tr("Send Message", "Envoyer le message")}
                </Btn>
              </div>
            )}
          </div>
          <div>
            <SectionLabel t={t}>{tr("Stay Anonymous", "Rester anonyme")}</SectionLabel>
            <h2
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 26,
                fontWeight: 700,
                color: t.text,
                marginBottom: 16,
              }}
            >
              {tr("Anonymous message", "Message anonyme")}
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 15,
                color: t.textMuted,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              {tr(
                "Your identity will not be recorded. Use this form if you need to reach us without identifying yourself. No name. No email. Just your message.",
                "Votre identité ne sera pas enregistrée. Utilisez ce formulaire si vous devez nous contacter sans vous identifier. Pas de nom. Pas d'e-mail. Juste votre message.",
              )}
            </p>
            {anonSent ? (
              <FormSuccess
                t={t}
                message={tr(
                  "Anonymous message received. Thank you for trusting us with this. We will read it carefully.",
                  "Message anonyme reçu. Merci de nous faire confiance. Nous le lirons attentivement.",
                )}
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Select
                  t={t}
                  value={anonForm.subject}
                  onChange={(e) => setAnonForm({ ...anonForm, subject: e.target.value })}
                >
                  {anonSubjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
                <Textarea
                  t={t}
                  placeholder={tr(
                    "Type your message here. You do not need to identify yourself. (minimum 10 characters)",
                    "Écrivez votre message ici. Vous n'avez pas besoin de vous identifier. (10 caractères minimum)",
                  )}
                  value={anonForm.message}
                  onChange={(e) => setAnonForm({ ...anonForm, message: e.target.value })}
                />
                <Btn
                  t={t}
                  variant="secondary"
                  onClick={handleAnon}
                  style={{ opacity: anonSending ? 0.6 : 1 }}
                >
                  {anonSending
                    ? tr("Sending...", "Envoi en cours...")
                    : tr("Send Anonymously", "Envoyer anonymement")}
                </Btn>
              </div>
            )}
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: `1px solid ${t.borderColor}` }}>
              <p
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: t.accent,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {tr("Direct Contact", "Contact direct")}
              </p>
              <a
                href={`mailto:${LUMA_EMAIL}`}
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 16,
                  color: t.text,
                  display: "block",
                  marginBottom: 8,
                }}
              >
                {LUMA_EMAIL}
              </a>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 14,
                  color: t.textMuted,
                  lineHeight: 1.7,
                }}
              >
                {tr(
                  "We read every message and respond to everything. Give us up to 48 hours.",
                  "Nous lisons chaque message et répondons à tout. Laissez-nous jusqu'à 48 heures.",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── GAME DATA ────────────────────────────────────────────────────────────────

const MYTH_CARDS = [
  {
    statement: "You can get HIV from sharing a classroom with someone who is HIV positive.",
    statementFr: "On peut contracter le VIH en partageant une salle de classe avec une personne séropositive.",
    answer: false,
    explanation:
      "HIV is not transmitted through the air or casual contact. You cannot get HIV from sitting in the same room, sharing desks, or breathing the same air as someone who is HIV positive.",
    explanationFr:
      "Le VIH ne se transmet pas par l'air ou le contact occasionnel. On ne peut pas contracter le VIH en étant assis dans la même pièce, en partageant un bureau, ou en respirant le même air qu'une personne séropositive.",
  },
  {
    statement:
      "A person on HIV treatment with an undetectable viral load cannot transmit HIV sexually.",
    statementFr:
      "Une personne sous traitement contre le VIH avec une charge virale indétectable ne peut pas transmettre le VIH par voie sexuelle.",
    answer: true,
    explanation:
      "This is U=U: Undetectable equals Untransmittable. Settled science endorsed by the WHO. When treatment keeps viral load undetectable, sexual transmission cannot occur.",
    explanationFr:
      "C'est le principe I=I : Indétectable égale Intransmissible. Une science établie, reconnue par l'OMS. Quand le traitement maintient la charge virale indétectable, la transmission sexuelle ne peut pas se produire.",
  },
  {
    statement: "HIV can be transmitted through mosquito bites.",
    statementFr: "Le VIH peut se transmettre par les piqûres de moustique.",
    answer: false,
    explanation:
      "Mosquitoes cannot transmit HIV. The virus does not survive or replicate inside mosquitoes, and they do not inject blood when biting.",
    explanationFr:
      "Les moustiques ne peuvent pas transmettre le VIH. Le virus ne survit pas ni ne se réplique à l'intérieur des moustiques, et ils n'injectent pas de sang en piquant.",
  },
  {
    statement:
      "PrEP reduces the risk of getting HIV from sex by up to 99% when taken consistently.",
    statementFr:
      "La PrEP réduit le risque de contracter le VIH par voie sexuelle jusqu'à 99 % lorsqu'elle est prise régulièrement.",
    answer: true,
    explanation:
      "PrEP is a daily medication that is extremely effective at preventing HIV when taken as prescribed. It is available in Nigeria through public health facilities.",
    explanationFr:
      "La PrEP est un médicament quotidien extrêmement efficace pour prévenir le VIH lorsqu'il est pris comme prescrit. Elle est disponible au Nigéria via les établissements de santé publique.",
  },
  {
    statement: "HIV positive students can be legally expelled from Nigerian universities.",
    statementFr: "Les étudiants séropositifs peuvent être légalement exclus des universités nigérianes.",
    answer: false,
    explanation:
      "Nigeria's HIV and AIDS Anti-Discrimination Act 2014 prohibits denial of education based on HIV status. Any such expulsion is unlawful.",
    explanationFr:
      "La loi nigériane de 2014 sur l'anti-discrimination liée au VIH et au sida interdit le refus d'éducation en raison du statut sérologique. Une telle exclusion est illégale.",
  },
  {
    statement: "You can get HIV from sharing food, water, or eating utensils.",
    statementFr: "On peut contracter le VIH en partageant de la nourriture, de l'eau ou des couverts.",
    answer: false,
    explanation:
      "HIV is not present in saliva in amounts that can cause infection. Sharing food, drinks, or utensils with someone living with HIV carries absolutely no transmission risk.",
    explanationFr:
      "Le VIH n'est pas présent dans la salive en quantités suffisantes pour causer une infection. Partager de la nourriture, des boissons ou des couverts avec une personne vivant avec le VIH ne présente absolument aucun risque de transmission.",
  },
  {
    statement:
      "HIV stigma directly damages the mental health of students living with HIV on campus.",
    statementFr:
      "La stigmatisation du VIH nuit directement à la santé mentale des étudiants séropositifs sur le campus.",
    answer: true,
    explanation:
      "Research consistently links HIV stigma to higher rates of depression, anxiety, social withdrawal, and poorer treatment adherence among young people living with HIV.",
    explanationFr:
      "La recherche établit systématiquement un lien entre la stigmatisation du VIH et des taux plus élevés de dépression, d'anxiété, de retrait social et une moins bonne observance du traitement chez les jeunes vivant avec le VIH.",
  },
  {
    statement:
      "Having a high HIV knowledge score means you will not stigmatise people living with HIV.",
    statementFr:
      "Avoir un score de connaissance élevé sur le VIH signifie qu'on ne stigmatisera pas les personnes séropositives.",
    answer: false,
    explanation:
      "The knowledge-attitude paradox: 96.85% of students may have high HIV knowledge yet only 55.5% hold non-stigmatising attitudes. Knowledge alone is not enough.",
    explanationFr:
      "Le paradoxe connaissance-attitude : 96,85 % des étudiants peuvent avoir une connaissance élevée du VIH, mais seulement 55,5 % ont des attitudes non stigmatisantes. La connaissance seule ne suffit pas.",
  },
  {
    statement: "PrEP is available in Nigeria.",
    statementFr: "La PrEP est disponible au Nigéria.",
    answer: true,
    explanation:
      "PrEP has been available in Nigeria since 2017 through public health facilities, often at low or no cost. You can walk into a nearby public health facility and ask.",
    explanationFr:
      "La PrEP est disponible au Nigéria depuis 2017 via les établissements de santé publique, souvent à faible coût ou gratuitement. Vous pouvez vous rendre dans un établissement de santé publique à proximité et la demander.",
  },
  {
    statement: "You can always tell someone is HIV positive from their appearance.",
    statementFr: "On peut toujours savoir qu'une personne est séropositive rien qu'à son apparence.",
    answer: false,
    explanation:
      "HIV has no visible symptoms for years in many people, especially those on treatment. You cannot tell anyone's HIV status from how they look.",
    explanationFr:
      "Le VIH n'entraîne aucun symptôme visible pendant des années chez de nombreuses personnes, en particulier celles sous traitement. On ne peut pas déduire le statut sérologique de quelqu'un à partir de son apparence.",
  },
];

const QUIZ_QUESTIONS = [
  {
    question: "What does U=U stand for in HIV science?",
    questionFr: "Que signifie I=I dans la science du VIH ?",
    options: [
      "Unique equals Universal",
      "Undetectable equals Untransmittable",
      "Untreated equals Unsafe",
      "Undisclosed equals Unprotected",
    ],
    optionsFr: [
      "Unique égale Universel",
      "Indétectable égale Intransmissible",
      "Non traité égale Dangereux",
      "Non divulgué égale Non protégé",
    ],
    correct: 1,
  },
  {
    question: "What is Nigeria's national HIV prevalence according to UNAIDS 2025?",
    questionFr: "Quelle est la prévalence nationale du VIH au Nigéria selon l'ONUSIDA 2025 ?",
    options: ["0.5%", "3.2%", "1.4%", "5.1%"],
    optionsFr: ["0,5 %", "3,2 %", "1,4 %", "5,1 %"],
    correct: 2,
  },
  {
    question: "What is PrEP used for?",
    questionFr: "À quoi sert la PrEP ?",
    options: [
      "Treating HIV in positive people",
      "Preventing HIV in HIV negative people at risk",
      "Curing HIV completely",
      "Boosting the immune system",
    ],
    optionsFr: [
      "Traiter le VIH chez les personnes séropositives",
      "Prévenir le VIH chez les personnes séronégatives à risque",
      "Guérir complètement le VIH",
      "Renforcer le système immunitaire",
    ],
    correct: 1,
  },
  {
    question: "Which law protects HIV positive students from being expelled in Nigeria?",
    questionFr: "Quelle loi protège les étudiants séropositifs contre l'exclusion au Nigéria ?",
    options: [
      "National Health Act 2010",
      "HIV and AIDS Anti-Discrimination Act 2014",
      "Student Welfare Act 2018",
      "Public Health Protection Law 2020",
    ],
    optionsFr: [
      "Loi nationale sur la santé de 2010",
      "Loi anti-discrimination sur le VIH et le sida de 2014",
      "Loi sur le bien-être étudiant de 2018",
      "Loi sur la protection de la santé publique de 2020",
    ],
    correct: 1,
  },
  {
    question: "HIV can be transmitted through which of the following?",
    questionFr: "Le VIH peut se transmettre par lequel des éléments suivants ?",
    options: [
      "Sharing a classroom",
      "Mosquito bites",
      "Blood transfusion",
      "Sharing food or utensils",
    ],
    optionsFr: [
      "Partager une salle de classe",
      "Piqûres de moustique",
      "Transfusion sanguine",
      "Partager de la nourriture ou des couverts",
    ],
    correct: 2,
  },
  {
    question:
      "What percentage of university students hold stigmatising attitudes despite knowing HIV facts?",
    questionFr:
      "Quel pourcentage d'étudiants universitaires ont des attitudes stigmatisantes malgré la connaissance des faits sur le VIH ?",
    options: ["About 10%", "About 25%", "About 45%", "About 80%"],
    optionsFr: ["Environ 10 %", "Environ 25 %", "Environ 45 %", "Environ 80 %"],
    correct: 2,
  },
  {
    question: "How effective is PrEP at preventing HIV when taken consistently?",
    questionFr: "Quelle est l'efficacité de la PrEP pour prévenir le VIH lorsqu'elle est prise régulièrement ?",
    options: ["About 50%", "About 70%", "About 85%", "Up to 99%"],
    optionsFr: ["Environ 50 %", "Environ 70 %", "Environ 85 %", "Jusqu'à 99 %"],
    correct: 3,
  },
  {
    question: "What does the status neutral approach mean?",
    questionFr: "Que signifie l'approche « statut neutre » ?",
    options: [
      "Keeping HIV status secret",
      "Treating everyone the same regardless of HIV status",
      "Only serving HIV negative people",
      "Separating positive and negative services",
    ],
    optionsFr: [
      "Garder le statut sérologique secret",
      "Traiter tout le monde de la même façon, quel que soit le statut sérologique",
      "Ne servir que les personnes séronégatives",
      "Séparer les services pour séropositifs et séronégatifs",
    ],
    correct: 1,
  },
  {
    question: "How long does it typically take to reach an undetectable viral load on ART?",
    questionFr: "Combien de temps faut-il généralement pour atteindre une charge virale indétectable sous ARV ?",
    options: ["1 to 2 weeks", "3 to 6 months", "2 to 3 years", "It is immediate"],
    optionsFr: ["1 à 2 semaines", "3 à 6 mois", "2 à 3 ans", "C'est immédiat"],
    correct: 1,
  },
  {
    question: "What does LUMA stand for?",
    questionFr: "Que signifie LUMA ?",
    options: [
      "Lifting Up Marginalised Africans",
      "Learning, Understanding, Movement, Action",
      "Luminating Africa",
      "Leading Universal Medical Advocacy",
    ],
    optionsFr: [
      "Lifting Up Marginalised Africans",
      "Learning, Understanding, Movement, Action",
      "Luminating Africa",
      "Leading Universal Medical Advocacy",
    ],
    correct: 2,
  },
];

const SCENARIOS = [
  {
    situation:
      "Your roommate just disclosed that they are living with HIV. They ask if you are okay sharing the hostel room.",
    situationFr:
      "Votre camarade de chambre vient de vous révéler qu'il/elle vit avec le VIH. Il/elle vous demande si vous êtes d'accord pour continuer à partager la chambre d'internat.",
    choices: [
      "Tell them you need to move rooms immediately",
      "Say nothing and start avoiding them",
      "Reassure them, ask how they are doing, and keep sharing the room",
      "Tell other floor mates so they know",
    ],
    choicesFr: [
      "Lui dire que vous devez changer de chambre immédiatement",
      "Ne rien dire et commencer à l'éviter",
      "Le/la rassurer, lui demander comment il/elle va, et continuer à partager la chambre",
      "Le dire aux autres résidents de l'étage",
    ],
    correct: 2,
    explanation:
      "HIV is not transmitted through casual contact or shared living spaces. Reassuring your roommate and continuing to share is the right response. Your support means everything.",
    explanationFr:
      "Le VIH ne se transmet pas par contact occasionnel ou par le partage d'un espace de vie. Rassurer votre camarade de chambre et continuer à partager l'espace est la bonne réponse. Votre soutien compte plus que tout.",
  },
  {
    situation:
      "A classmate is spreading rumours that another student is HIV positive and telling people to avoid them.",
    situationFr:
      "Un camarade de classe répand des rumeurs selon lesquelles un autre étudiant est séropositif et dit aux gens de l'éviter.",
    choices: [
      "Join in to avoid being ostracised",
      "Stay silent, it is not your business",
      "Confront the classmate privately and tell them this is harmful and potentially illegal",
      "Laugh along but feel bad later",
    ],
    choicesFr: [
      "Participer pour éviter d'être mis à l'écart",
      "Rester silencieux, ce n'est pas votre problème",
      "Confronter le camarade en privé et lui dire que c'est nuisible et potentiellement illégal",
      "Rire avec les autres mais se sentir mal après",
    ],
    correct: 2,
    explanation:
      "Disclosing someone's HIV status without consent violates their rights. Confronting the classmate directly is the right thing. Silence makes you complicit.",
    explanationFr:
      "Divulguer le statut sérologique de quelqu'un sans son consentement viole ses droits. Confronter directement le camarade est la bonne chose à faire. Le silence vous rend complice.",
  },
  {
    situation:
      "You want to get tested for HIV but fear people at the campus health centre will find out your results.",
    situationFr:
      "Vous voulez faire un test de dépistage du VIH mais craignez que le personnel du centre de santé du campus ne découvre vos résultats.",
    choices: [
      "Never get tested and hope for the best",
      "Go ahead. Your health records are confidential by law.",
      "Ask a friend to get tested for you",
      "Only get tested if you feel unwell",
    ],
    choicesFr: [
      "Ne jamais faire de test et espérer que tout aille bien",
      "Faites-le. Vos dossiers médicaux sont confidentiels par la loi.",
      "Demander à un ami de se faire tester à votre place",
      "Ne se faire tester qu'en cas de malaise",
    ],
    correct: 1,
    explanation:
      "Your medical records at the health centre are legally protected. Staff cannot disclose your HIV status without your consent. Getting tested is always the right decision.",
    explanationFr:
      "Vos dossiers médicaux au centre de santé sont légalement protégés. Le personnel ne peut pas divulguer votre statut sérologique sans votre consentement. Se faire tester est toujours la bonne décision.",
  },
  {
    situation: "A lecturer comments in class that HIV is a disease of immoral people.",
    situationFr: "Un enseignant affirme en cours que le VIH est une maladie de personnes immorales.",
    choices: [
      "Agree loudly to fit in",
      "Stay quiet and move on",
      "Report the comment to the student union or department head as discriminatory",
      "Post about it anonymously and leave it",
    ],
    choicesFr: [
      "Être d'accord bruyamment pour s'intégrer",
      "Rester silencieux et passer à autre chose",
      "Signaler le commentaire comme discriminatoire au syndicat étudiant ou au chef de département",
      "En parler anonymement en ligne et en rester là",
    ],
    correct: 2,
    explanation:
      "HIV is a public health issue, not a moral failing. Discriminatory comments from authority figures should be formally reported. This is how campus culture changes.",
    explanationFr:
      "Le VIH est un problème de santé publique, pas une faute morale. Les propos discriminatoires venant de figures d'autorité doivent être signalés formellement. C'est ainsi que la culture du campus change.",
  },
  {
    situation:
      "Your friend just tested positive for HIV and calls you in tears. What do you say first?",
    situationFr:
      "Votre ami vient de recevoir un résultat positif au VIH et vous appelle en larmes. Que dites-vous en premier ?",
    choices: [
      "Tell them it is their own fault",
      "Hang up because you do not know what to say",
      "Tell them you are there for them and ask what they need right now",
      "Immediately list every resource you know",
    ],
    choicesFr: [
      "Lui dire que c'est de sa faute",
      "Raccrocher parce que vous ne savez pas quoi dire",
      "Lui dire que vous êtes là pour lui/elle et lui demander de quoi il/elle a besoin maintenant",
      "Énumérer immédiatement toutes les ressources que vous connaissez",
    ],
    correct: 2,
    explanation:
      "When someone has just received a diagnosis, they need to feel heard first. Ask what they need. Be present. Resources come after. Presence comes first.",
    explanationFr:
      "Quand quelqu'un vient de recevoir un diagnostic, il a d'abord besoin de se sentir écouté. Demandez de quoi il a besoin. Soyez présent. Les ressources viennent après. La présence vient d'abord.",
  },
];

// ─── GAME COMPONENTS ──────────────────────────────────────────────────────────

const ProgressBar = ({ t, value, max }) => (
  <div
    style={{
      background: t.borderColor,
      borderRadius: 100,
      height: 6,
      width: "100%",
      margin: "12px 0 24px",
    }}
  >
    <div
      style={{
        background: t.accent,
        borderRadius: 100,
        height: 6,
        width: `${(value / max) * 100}%`,
        transition: "width 0.4s ease",
      }}
    />
  </div>
);

const MythBusterGame = ({ t }) => {
  const { tr, lang } = useLang();
  const [cards] = useState([...MYTH_CARDS].sort(() => Math.random() - 0.5));
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const answer = (choice) => {
    const correct = choice === cards[idx].answer;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, correct]);
    setRevealed(true);
  };
  const next = () => {
    if (idx + 1 >= cards.length) {
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
    setRevealed(false);
  };
  const reset = () => {
    setIdx(0);
    setRevealed(false);
    setScore(0);
    setAnswers([]);
    setDone(false);
  };

  if (done)
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: t.primary,
          }}
        >
          {score}/{cards.length}
        </div>
        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: t.text,
            marginTop: 12,
          }}
        >
          {score >= 8
            ? tr("Outstanding. You know your HIV facts.", "Exceptionnel. Vous maîtrisez les faits sur le VIH.")
            : score >= 6
              ? tr("Great work. A few myths still to bust.", "Bon travail. Quelques mythes restent à démystifier.")
              : tr("Keep learning. Every truth matters.", "Continuez à apprendre. Chaque vérité compte.")}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 15,
            color: t.textMuted,
            marginTop: 8,
            marginBottom: 32,
          }}
        >
          {tr("Read the Campus Truth Series to fill any gaps.", "Lisez la série Vérité Campus pour combler vos lacunes.")}
        </p>
        <Btn t={t} variant="primary" onClick={reset}>
          {tr("Play Again", "Rejouer")}
        </Btn>
      </div>
    );

  const card = cards[idx];
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: t.textMuted,
          }}
        >
          {tr(`Card ${idx + 1} of ${cards.length}`, `Carte ${idx + 1} sur ${cards.length}`)}
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: t.accent,
          }}
        >
          {tr(`Score: ${score}`, `Score : ${score}`)}
        </span>
      </div>
      <ProgressBar t={t} value={idx} max={cards.length} />
      <div
        style={{
          background: t.isDark ? t.surface : t.accentLight,
          borderRadius: 16,
          padding: "36px 28px",
          minHeight: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 18,
            fontWeight: 600,
            color: t.text,
            lineHeight: 1.5,
          }}
        >
          {lang === "fr" && card.statementFr ? card.statementFr : card.statement}
        </p>
      </div>
      {!revealed ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <button
            onClick={() => answer(true)}
            style={{
              background: t.primary,
              color: t.ivory,
              border: "none",
              borderRadius: 12,
              padding: "18px",
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ✓ {tr("TRUE", "VRAI")}
          </button>
          <button
            onClick={() => answer(false)}
            style={{
              background: "transparent",
              color: t.primary,
              border: `2px solid ${t.primary}`,
              borderRadius: 12,
              padding: "18px",
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ✗ {tr("FALSE", "FAUX")}
          </button>
        </div>
      ) : (
        <div>
          <div
            style={{
              background: answers[answers.length - 1] ? t.accentLight : "#FFE8E8",
              border: `1.5px solid ${answers[answers.length - 1] ? t.accent : "#E88"}`,
              borderRadius: 12,
              padding: "20px 24px",
              marginBottom: 16,
            }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: answers[answers.length - 1] ? t.primary : "#C00",
                marginBottom: 8,
              }}
            >
              {answers[answers.length - 1] ? tr("✓ Correct!", "✓ Correct !") : tr("✗ Not quite.", "✗ Pas tout à fait.")}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 15,
                color: t.text,
                lineHeight: 1.7,
              }}
            >
              {lang === "fr" && card.explanationFr ? card.explanationFr : card.explanation}
            </p>
          </div>
          <Btn
            t={t}
            variant="primary"
            onClick={next}
            style={{ width: "100%", textAlign: "center" }}
          >
            {idx + 1 >= cards.length ? tr("See Results", "Voir les résultats") : tr("Next Card →", "Carte suivante →")}
          </Btn>
        </div>
      )}
    </div>
  );
};

const QuizGame = ({ t }) => {
  const { tr, lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (done || selected !== null) return;
    if (timeLeft <= 0) {
      setSelected(-1);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, done, selected]);

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === QUIZ_QUESTIONS[idx].correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (idx + 1 >= QUIZ_QUESTIONS.length) {
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
    setSelected(null);
    setTimeLeft(20);
  };
  const reset = () => {
    setIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setTimeLeft(20);
  };

  if (done)
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: t.primary,
          }}
        >
          {score}/{QUIZ_QUESTIONS.length}
        </div>
        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: t.text,
            marginTop: 12,
          }}
        >
          {score >= 9
            ? tr("LUMA Champion. You know this inside out.", "Champion LUMA. Vous maîtrisez le sujet à fond.")
            : score >= 7
              ? tr("Solid knowledge. Keep reading Campus Truth.", "Bonnes connaissances. Continuez à lire Vérité Campus.")
              : tr("Great effort. The Campus Truth Series has everything.", "Bel effort. La série Vérité Campus a tout ce qu'il vous faut.")}
        </p>
        <div style={{ marginTop: 32 }}>
          <Btn t={t} variant="primary" onClick={reset}>
            {tr("Try Again", "Réessayer")}
          </Btn>
        </div>
      </div>
    );

  const q = QUIZ_QUESTIONS[idx];
  const qOptions = lang === "fr" && q.optionsFr ? q.optionsFr : q.options;
  const timerColor = timeLeft <= 5 ? "#E53" : t.accent;
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: t.textMuted,
          }}
        >
          {tr(`Q${idx + 1} of ${QUIZ_QUESTIONS.length}`, `Q${idx + 1} sur ${QUIZ_QUESTIONS.length}`)}
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: timerColor,
          }}
        >
          {timeLeft}s
        </span>
      </div>
      <ProgressBar t={t} value={idx} max={QUIZ_QUESTIONS.length} />
      <div
        style={{
          background: t.isDark ? t.surface : t.accentLight,
          borderRadius: 16,
          padding: "28px 24px",
          marginBottom: 20,
        }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 18,
            fontWeight: 600,
            color: t.text,
            lineHeight: 1.5,
          }}
        >
          {lang === "fr" && q.questionFr ? q.questionFr : q.question}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {qOptions.map((opt, i) => {
          let bg = t.card,
            border = t.borderColor,
            color = t.text;
          if (selected !== null) {
            if (i === q.correct) {
              bg = t.accentLight;
              border = t.accent;
              color = t.primary;
            } else if (i === selected && i !== q.correct) {
              bg = "#FFE8E8";
              border = "#E88";
              color = "#C00";
            }
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              style={{
                background: bg,
                border: `1.5px solid ${border}`,
                borderRadius: 10,
                padding: "14px 18px",
                textAlign: "left",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 15,
                color,
                cursor: selected !== null ? "default" : "pointer",
                transition: "all 0.2s",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 700,
                  marginRight: 10,
                  color: t.accent,
                }}
              >
                {"ABCD"[i]}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ marginTop: 16 }}>
          <Btn
            t={t}
            variant="primary"
            onClick={next}
            style={{ width: "100%", textAlign: "center" }}
          >
            {idx + 1 >= QUIZ_QUESTIONS.length ? tr("See Final Score", "Voir le score final") : tr("Next Question →", "Question suivante →")}
          </Btn>
        </div>
      )}
    </div>
  );
};

const ScenarioGame = ({ t }) => {
  const { tr, lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const choose = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === SCENARIOS[idx].correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (idx + 1 >= SCENARIOS.length) {
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
    setChosen(null);
  };
  const reset = () => {
    setIdx(0);
    setChosen(null);
    setScore(0);
    setDone(false);
  };

  if (done)
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: t.primary,
          }}
        >
          {score}/{SCENARIOS.length}
        </div>
        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: t.text,
            marginTop: 12,
          }}
        >
          {score >= 4
            ? tr("Excellent. You would be a real ally on any campus.", "Excellent. Vous seriez un véritable allié sur n'importe quel campus.")
            : score >= 3
              ? tr("Good instincts. Keep building your empathy.", "Bons instincts. Continuez à cultiver votre empathie.")
              : tr("Keep learning. Every scenario teaches you something.", "Continuez à apprendre. Chaque scénario vous apprend quelque chose.")}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 15,
            color: t.textMuted,
            marginTop: 8,
            marginBottom: 32,
          }}
        >
          {tr("Campus allyship starts with decisions exactly like these.", "La solidarité sur le campus commence par des décisions exactement comme celles-ci.")}
        </p>
        <Btn t={t} variant="primary" onClick={reset}>
          {tr("Play Again", "Rejouer")}
        </Btn>
      </div>
    );

  const sc = SCENARIOS[idx];
  const scChoices = lang === "fr" && sc.choicesFr ? sc.choicesFr : sc.choices;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: t.textMuted,
          }}
        >
          {tr(`Scenario ${idx + 1} of ${SCENARIOS.length}`, `Scénario ${idx + 1} sur ${SCENARIOS.length}`)}
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: t.accent,
          }}
        >
          {tr(`Score: ${score}`, `Score : ${score}`)}
        </span>
      </div>
      <ProgressBar t={t} value={idx} max={SCENARIOS.length} />
      <div
        style={{ background: t.primary, borderRadius: 14, padding: "28px 24px", marginBottom: 20 }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "1.5px",
            color: t.accent,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {tr("The Situation", "La situation")}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 16,
            color: t.ivory,
            lineHeight: 1.7,
          }}
        >
          {lang === "fr" && sc.situationFr ? sc.situationFr : sc.situation}
        </p>
      </div>
      <p
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: t.textMuted,
          marginBottom: 10,
        }}
      >
        {tr("What do you do?", "Que faites-vous ?")}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {scChoices.map((choice, i) => {
          let bg = t.card,
            border = t.borderColor,
            color = t.text;
          if (chosen !== null) {
            if (i === sc.correct) {
              bg = t.accentLight;
              border = t.accent;
              color = t.primary;
            } else if (i === chosen && i !== sc.correct) {
              bg = "#FFE8E8";
              border = "#E88";
              color = "#C00";
            }
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              style={{
                background: bg,
                border: `1.5px solid ${border}`,
                borderRadius: 10,
                padding: "14px 18px",
                textAlign: "left",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 15,
                color,
                cursor: chosen !== null ? "default" : "pointer",
                transition: "all 0.2s",
                lineHeight: 1.5,
              }}
            >
              {choice}
            </button>
          );
        })}
      </div>
      {chosen !== null && (
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              background: chosen === sc.correct ? t.accentLight : "#FFF0F0",
              border: `1.5px solid ${chosen === sc.correct ? t.accent : "#E88"}`,
              borderRadius: 10,
              padding: "18px 20px",
              marginBottom: 14,
            }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: chosen === sc.correct ? t.primary : "#C00",
                marginBottom: 8,
              }}
            >
              {chosen === sc.correct ? tr("✓ Well done.", "✓ Bien joué.") : tr("✗ Think again.", "✗ Réfléchissez encore.")}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                color: t.text,
                lineHeight: 1.7,
              }}
            >
              {lang === "fr" && sc.explanationFr ? sc.explanationFr : sc.explanation}
            </p>
          </div>
          <Btn
            t={t}
            variant="primary"
            onClick={next}
            style={{ width: "100%", textAlign: "center" }}
          >
            {idx + 1 >= SCENARIOS.length ? tr("See Your Result", "Voir votre résultat") : tr("Next Scenario →", "Scénario suivant →")}
          </Btn>
        </div>
      )}
    </div>
  );
};

// ─── WORD SCRAMBLE ────────────────────────────────────────────────────────────

const SCRAMBLE_WORDS = [
  {
    word: "PREP",
    clue: "Pre-Exposure ____. Reduces HIV risk by up to 99% when taken consistently.",
    clueFr: "Prophylaxie pré-exposition (____). Réduit le risque de VIH jusqu'à 99 % lorsqu'elle est prise régulièrement.",
  },
  {
    word: "STIGMA",
    clue: "The social judgement LUMA is built to dismantle.",
    clueFr: "Le jugement social que LUMA a été créée pour démanteler.",
  },
  {
    word: "STATUS",
    clue: "In LUMA's status neutral approach, this word describes what does not determine your care.",
    clueFr: "Dans l'approche « statut neutre » de LUMA, ce mot décrit ce qui ne détermine pas vos soins.",
  },
  {
    word: "TESTING",
    clue: "The first step toward knowing your HIV status. Free and confidential in Nigeria.",
    clueFr: "La première étape pour connaître votre statut sérologique. Gratuit et confidentiel au Nigéria.",
  },
  {
    word: "ADHERENCE",
    clue: "Taking treatment consistently. Key to reaching undetectable.",
    clueFr: "Prendre son traitement de façon régulière. Essentiel pour atteindre l'indétectabilité.",
  },
  {
    word: "UNDETECTABLE",
    clue: "The viral load level at which HIV cannot be transmitted sexually.",
    clueFr: "Le niveau de charge virale à partir duquel le VIH ne peut plus se transmettre sexuellement.",
  },
  {
    word: "CAMPUS",
    clue: "Where LUMA does its work — Nigerian universities.",
    clueFr: "Là où LUMA mène son action — les universités nigérianes.",
  },
  {
    word: "ADVOCACY",
    clue: "Turning knowledge into policy change. One of LUMA's three pillars.",
    clueFr: "Transformer la connaissance en changement de politique. L'un des trois piliers de LUMA.",
  },
];

const shuffleStr = (w) => {
  const a = w.split("");
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  const out = a.join("");
  return out === w ? shuffleStr(w) : out;
};

const WordScrambleGame = ({ t }) => {
  const { tr, lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [scrambled, setScrambled] = useState(() => shuffleStr(SCRAMBLE_WORDS[0].word));
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState(null); // null | 'right' | 'wrong'
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const current = SCRAMBLE_WORDS[idx];
  const check = () => {
    if (!guess.trim()) return;
    const ok = guess.trim().toUpperCase() === current.word;
    setStatus(ok ? "right" : "wrong");
    if (ok) setCorrect((c) => c + 1);
  };
  const next = () => {
    if (idx + 1 >= SCRAMBLE_WORDS.length) {
      setDone(true);
      return;
    }
    const n = idx + 1;
    setIdx(n);
    setScrambled(shuffleStr(SCRAMBLE_WORDS[n].word));
    setGuess("");
    setStatus(null);
  };
  const reset = () => {
    setIdx(0);
    setScrambled(shuffleStr(SCRAMBLE_WORDS[0].word));
    setGuess("");
    setStatus(null);
    setCorrect(0);
    setDone(false);
  };

  if (done)
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: t.primary,
          }}
        >
          {correct}/{SCRAMBLE_WORDS.length}
        </div>
        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: t.text,
            marginTop: 12,
          }}
        >
          {correct >= 6
            ? tr("Sharp. You speak the language of HIV response.", "Impressionnant. Vous parlez le langage de la riposte au VIH.")
            : correct >= 4
              ? tr("Nice work. Read the Guides to lock in the rest.", "Bon travail. Lisez les Guides pour consolider le reste.")
              : tr("Every word matters. The vocabulary is the foundation.", "Chaque mot compte. Le vocabulaire est la base.")}
        </p>
        <div style={{ marginTop: 32 }}>
          <Btn t={t} variant="primary" onClick={reset}>
            {tr("Play Again", "Rejouer")}
          </Btn>
        </div>
      </div>
    );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: t.textMuted,
          }}
        >
          {tr(`Word ${idx + 1} of ${SCRAMBLE_WORDS.length}`, `Mot ${idx + 1} sur ${SCRAMBLE_WORDS.length}`)}
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: t.accent,
          }}
        >
          {tr(`Correct: ${correct}`, `Correct : ${correct}`)}
        </span>
      </div>
      <ProgressBar t={t} value={idx} max={SCRAMBLE_WORDS.length} />
      <div
        style={{
          background: t.isDark ? t.surface : t.accentLight,
          borderRadius: 16,
          padding: "36px 20px",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "1.5px",
            color: t.textMuted,
            marginBottom: 12,
          }}
        >
          {tr("LETTERS", "LETTRES")}
        </p>
        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 40,
            fontWeight: 800,
            color: t.primary,
            letterSpacing: "10px",
          }}
        >
          {scrambled}
        </p>
      </div>
      <p
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 15,
          color: t.textMuted,
          lineHeight: 1.6,
          marginBottom: 14,
        }}
      >
        {lang === "fr" && current.clueFr ? current.clueFr : current.clue}
      </p>
      <input
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && status === null) check();
        }}
        disabled={status !== null}
        placeholder={tr("Your answer", "Votre réponse")}
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: 10,
          border: `1.5px solid ${t.borderColor}`,
          background: t.card,
          color: t.text,
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: 16,
          marginBottom: 14,
          textTransform: "uppercase",
        }}
      />
      {status === null ? (
        <Btn t={t} variant="primary" onClick={check} style={{ width: "100%", textAlign: "center" }}>
          {tr("Check", "Vérifier")}
        </Btn>
      ) : (
        <div>
          <div
            style={{
              background: status === "right" ? t.accentLight : "#FFE8E8",
              border: `1.5px solid ${status === "right" ? t.accent : "#E88"}`,
              borderRadius: 10,
              padding: "16px 18px",
              marginBottom: 14,
            }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: status === "right" ? t.primary : "#C00",
                marginBottom: 6,
              }}
            >
              {status === "right" ? tr("✓ Correct!", "✓ Correct !") : tr(`✗ The word was ${current.word}.`, `✗ Le mot était ${current.word}.`)}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                color: t.text,
                lineHeight: 1.6,
              }}
            >
              {lang === "fr" && current.clueFr ? current.clueFr : current.clue}
            </p>
          </div>
          <Btn
            t={t}
            variant="primary"
            onClick={next}
            style={{ width: "100%", textAlign: "center" }}
          >
            {idx + 1 >= SCRAMBLE_WORDS.length ? tr("See Results", "Voir les résultats") : tr("Next Word →", "Mot suivant →")}
          </Btn>
        </div>
      )}
    </div>
  );
};

// ─── MEMORY MATCH ─────────────────────────────────────────────────────────────

const MEMORY_PAIRS = [
  {
    a: "Right to education regardless of HIV status",
    aFr: "Droit à l'éducation quel que soit le statut sérologique",
    b: "HIV and AIDS Anti-Discrimination Act 2014",
    bFr: "Loi anti-discrimination sur le VIH et le sida de 2014",
  },
  {
    a: "Confidential HIV test results",
    aFr: "Résultats du test VIH confidentiels",
    b: "National Health Act 2014, Section 26",
    bFr: "Loi nationale sur la santé de 2014, Section 26",
  },
  {
    a: "Free ART and PrEP at public clinics",
    aFr: "ARV et PrEP gratuits dans les cliniques publiques",
    b: "2026 National Health Guidelines",
    bFr: "Directives nationales de santé 2026",
  },
  {
    a: "No forced HIV disclosure to universities",
    aFr: "Aucune divulgation forcée du VIH aux universités",
    b: "Anti-Discrimination Act, Section 5",
    bFr: "Loi anti-discrimination, Section 5",
  },
  {
    a: "Right to work with HIV",
    aFr: "Droit de travailler en vivant avec le VIH",
    b: "Nigerian Labour Act — non-discrimination clause",
    bFr: "Loi nigériane du travail — clause de non-discrimination",
  },
  {
    a: "Freedom from stigma-based expulsion",
    aFr: "Protection contre l'exclusion fondée sur la stigmatisation",
    b: "Anti-Discrimination Act, Section 4",
    bFr: "Loi anti-discrimination, Section 4",
  },
];

const MemoryMatchGame = ({ t }) => {
  const { tr, lang } = useLang();
  const build = () => {
    const cards = [];
    MEMORY_PAIRS.forEach((p, i) => {
      cards.push({ id: `${i}a`, pair: i, text: lang === "fr" && p.aFr ? p.aFr : p.a, side: "a" });
      cards.push({ id: `${i}b`, pair: i, text: lang === "fr" && p.bFr ? p.bFr : p.b, side: "b" });
    });
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };
  const [cards, setCards] = useState(build);
  const [flipped, setFlipped] = useState([]); // ids currently face-up but unmatched
  const [matched, setMatched] = useState([]); // pair indices matched
  const [moves, setMoves] = useState(0);

  const flip = (id) => {
    if (flipped.includes(id)) return;
    const card = cards.find((c) => c.id === id);
    if (!card || matched.includes(card.pair)) return;
    if (flipped.length === 2) return;
    const nf = [...flipped, id];
    setFlipped(nf);
    if (nf.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = nf.map((fid) => cards.find((c) => c.id === fid));
      if (a && b && a.pair === b.pair) {
        setTimeout(() => {
          setMatched((m) => [...m, a.pair]);
          setFlipped([]);
        }, 500);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };
  const restart = () => {
    setCards(build());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };
  const done = matched.length === MEMORY_PAIRS.length;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: t.textMuted,
          }}
        >
          {tr(`Moves: ${moves}`, `Coups : ${moves}`)}
        </span>
        <button
          onClick={restart}
          style={{
            background: "none",
            border: `1.5px solid ${t.borderColor}`,
            borderRadius: 100,
            padding: "6px 14px",
            cursor: "pointer",
            color: t.text,
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {tr("Restart", "Recommencer")}
        </button>
      </div>
      {done && (
        <div
          style={{
            background: t.accentLight,
            border: `1.5px solid ${t.accent}`,
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: t.primary,
            }}
          >
            {tr(`All matched in ${moves} moves.`, `Toutes les paires trouvées en ${moves} coups.`)}
          </p>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 14,
              color: t.text,
              marginTop: 4,
            }}
          >
            {tr("Every right paired with the law that protects it.", "Chaque droit associé à la loi qui le protège.")}
          </p>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {cards.map((c) => {
          const isUp = flipped.includes(c.id) || matched.includes(c.pair);
          return (
            <button
              key={c.id}
              onClick={() => flip(c.id)}
              style={{
                minHeight: 110,
                padding: 10,
                borderRadius: 12,
                cursor: isUp ? "default" : "pointer",
                border: `1.5px solid ${isUp ? t.accent : t.borderColor}`,
                background: isUp
                  ? c.side === "a"
                    ? t.accentLight
                    : t.isDark
                      ? t.surface
                      : t.card
                  : t.primary,
                color: isUp ? t.text : t.ivory,
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: isUp ? 12 : 22,
                fontWeight: 700,
                lineHeight: 1.35,
                textAlign: "center",
                transition: "all 0.2s",
              }}
            >
              {isUp ? c.text : "?"}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── STIGMA BINGO ─────────────────────────────────────────────────────────────

const BINGO_PHRASES = [
  {
    phrase: "Keep your children away.",
    phraseFr: "Éloignez vos enfants.",
    rebuttal:
      "HIV is not transmitted through casual contact. Children of parents living with HIV are safe with any classmate.",
    rebuttalFr:
      "Le VIH ne se transmet pas par contact occasionnel. Les enfants de parents vivant avec le VIH ne présentent aucun danger pour leurs camarades.",
  },
  {
    phrase: "I could never date someone like that.",
    phraseFr: "Je ne pourrais jamais sortir avec quelqu'un comme ça.",
    rebuttal:
      "With treatment, U=U — undetectable equals untransmittable. A partner living with HIV on treatment cannot transmit the virus sexually.",
    rebuttalFr:
      "Avec le traitement, I=I — indétectable égale intransmissible. Un partenaire vivant avec le VIH sous traitement ne peut pas transmettre le virus par voie sexuelle.",
  },
  {
    phrase: "Who did they get it from?",
    phraseFr: "Qui le lui a transmis ?",
    rebuttal: "Someone's route of transmission is not your business. Curiosity is not concern.",
    rebuttalFr: "La façon dont quelqu'un a été infecté ne vous regarde pas. La curiosité n'est pas de l'inquiétude.",
  },
  {
    phrase: "Just avoid them, to be safe.",
    phraseFr: "Évitez-les simplement, par précaution.",
    rebuttal:
      "There is no danger to avoid. Casual contact does not transmit HIV. Avoidance is stigma, not safety.",
    rebuttalFr:
      "Il n'y a aucun danger à éviter. Le contact occasionnel ne transmet pas le VIH. L'évitement, c'est de la stigmatisation, pas de la sécurité.",
  },
  {
    phrase: "Don't hug them.",
    phraseFr: "Ne les prenez pas dans vos bras.",
    rebuttal:
      "Hugs, handshakes, and touch never transmit HIV. Withholding touch is one of the most damaging forms of stigma.",
    rebuttalFr:
      "Les accolades, les poignées de main et le contact physique ne transmettent jamais le VIH. Refuser le contact est l'une des formes de stigmatisation les plus nuisibles.",
  },
  {
    phrase: "They must have been careless.",
    phraseFr: "Ils ont dû être imprudents.",
    rebuttal:
      "HIV is a virus, not a verdict on character. Blame belongs to stigma, not the person living with the diagnosis.",
    rebuttalFr:
      "Le VIH est un virus, pas un jugement de caractère. Le blâme revient à la stigmatisation, pas à la personne vivant avec le diagnostic.",
  },
  {
    phrase: "HIV people can't have kids.",
    phraseFr: "Les personnes séropositives ne peuvent pas avoir d'enfants.",
    rebuttal:
      "People living with HIV have HIV-negative children every day. Treatment during pregnancy makes vertical transmission preventable.",
    rebuttalFr:
      "Des personnes vivant avec le VIH ont chaque jour des enfants séronégatifs. Le traitement pendant la grossesse permet de prévenir la transmission verticale.",
  },
  {
    phrase: "God is punishing them.",
    phraseFr: "Dieu les punit.",
    rebuttal:
      "HIV is a virus. Framing it as punishment is theology weaponised against public health.",
    rebuttalFr:
      "Le VIH est un virus. Le présenter comme une punition, c'est instrumentaliser la théologie contre la santé publique.",
  },
  {
    phrase: "Are you sure it's not AIDS?",
    phraseFr: "Vous êtes sûr que ce n'est pas le sida ?",
    rebuttal:
      "HIV and AIDS are different. Most people living with HIV on treatment never develop AIDS.",
    rebuttalFr:
      "Le VIH et le sida sont différents. La plupart des personnes vivant avec le VIH sous traitement ne développent jamais le sida.",
  },
  {
    phrase: "Their family must be ashamed.",
    phraseFr: "Leur famille doit avoir honte.",
    rebuttal: "Families of people living with HIV are not the source of shame. Stigma is.",
    rebuttalFr: "Les familles des personnes vivant avec le VIH ne sont pas la source de la honte. La stigmatisation l'est.",
  },
  {
    phrase: "It's a lifestyle problem.",
    phraseFr: "C'est un problème de mode de vie.",
    rebuttal:
      "HIV is a public health issue. Framing it as a lifestyle failure is stigma dressed as concern.",
    rebuttalFr:
      "Le VIH est un problème de santé publique. Le présenter comme un échec de mode de vie, c'est de la stigmatisation déguisée en inquiétude.",
  },
  {
    phrase: "They can't work here.",
    phraseFr: "Ils ne peuvent pas travailler ici.",
    rebuttal:
      "Nigerian labour law prohibits HIV-based discrimination in employment. This is not opinion — it is law.",
    rebuttalFr:
      "Le droit du travail nigérian interdit la discrimination fondée sur le VIH en matière d'emploi. Ce n'est pas une opinion, c'est la loi.",
  },
  {
    phrase: "They shouldn't be allowed to marry.",
    phraseFr: "Ils ne devraient pas avoir le droit de se marier.",
    rebuttal:
      "People living with HIV marry, love, and build families. There is no legal or medical basis to deny them.",
    rebuttalFr:
      "Les personnes vivant avec le VIH se marient, aiment et fondent des familles. Il n'existe aucune base légale ou médicale pour le leur refuser.",
  },
  {
    phrase: "They deserve it.",
    phraseFr: "Ils l'ont mérité.",
    rebuttal: "No one deserves a virus. This sentence is stigma at its rawest.",
    rebuttalFr: "Personne ne mérite un virus. Cette phrase est la stigmatisation à l'état brut.",
  },
  {
    phrase: "Only certain kinds of people get it.",
    phraseFr: "Seuls certains types de personnes l'attrapent.",
    rebuttal:
      "HIV does not discriminate. Anyone sexually active without protection is at some level of risk.",
    rebuttalFr:
      "Le VIH ne fait pas de discrimination. Toute personne sexuellement active sans protection présente un certain niveau de risque.",
  },
  {
    phrase: "Don't share cups with them.",
    phraseFr: "Ne partagez pas de verres avec eux.",
    rebuttal:
      "HIV is not transmitted through saliva or shared utensils. This myth has damaged lives for four decades.",
    rebuttalFr:
      "Le VIH ne se transmet pas par la salive ou des ustensiles partagés. Ce mythe a détruit des vies pendant quatre décennies.",
  },
  {
    phrase: "Don't touch their things.",
    phraseFr: "Ne touchez pas à leurs affaires.",
    rebuttal: "HIV cannot survive on surfaces long enough to transmit. Objects do not carry HIV.",
    rebuttalFr: "Le VIH ne survit pas assez longtemps sur les surfaces pour se transmettre. Les objets ne transportent pas le VIH.",
  },
  {
    phrase: "They shouldn't be in this class.",
    phraseFr: "Ils ne devraient pas être dans cette classe.",
    rebuttal:
      "Nigeria's HIV Anti-Discrimination Act 2014 makes exclusion from education illegal. Full stop.",
    rebuttalFr:
      "La loi nigériane anti-discrimination sur le VIH de 2014 rend l'exclusion de l'éducation illégale. Point final.",
  },
  {
    phrase: "They should keep it a secret.",
    phraseFr: "Ils devraient garder ça secret.",
    rebuttal:
      "Disclosure is a personal decision, not an obligation to secrecy. Silence protects stigma, not people.",
    rebuttalFr:
      "La divulgation est une décision personnelle, pas une obligation de secret. Le silence protège la stigmatisation, pas les personnes.",
  },
  {
    phrase: "Testing is only for 'those' people.",
    phraseFr: "Le dépistage n'est que pour « ces gens-là ».",
    rebuttal:
      "HIV testing is a normal, routine part of sexual health for everyone. There are no 'those people'.",
    rebuttalFr:
      "Le dépistage du VIH fait partie de la santé sexuelle normale et routinière de tout le monde. Il n'existe pas de « ces gens-là ».",
  },
  {
    phrase: "It's a punishment.",
    phraseFr: "C'est une punition.",
    rebuttal: "See: God is punishing them. Same distortion, same harm.",
    rebuttalFr: "Voir : Dieu les punit. Même distorsion, même dommage.",
  },
  {
    phrase: "You can catch it from a toilet seat.",
    phraseFr: "On peut l'attraper sur une lunette de toilettes.",
    rebuttal: "You cannot. HIV is not transmitted through surfaces, toilets, or bathrooms.",
    rebuttalFr: "C'est impossible. Le VIH ne se transmet pas par les surfaces, les toilettes ou les salles de bains.",
  },
  {
    phrase: "HIV = death sentence.",
    phraseFr: "VIH = condamnation à mort.",
    rebuttal:
      "With treatment, people living with HIV live full lifespans. This equation was outdated 20 years ago.",
    rebuttalFr:
      "Avec le traitement, les personnes vivant avec le VIH ont une espérance de vie normale. Cette équation était déjà dépassée il y a 20 ans.",
  },
  {
    phrase: "They brought it on themselves.",
    phraseFr: "Ils se le sont infligé eux-mêmes.",
    rebuttal: "Blame is stigma with a smile. HIV is a virus, not a moral outcome.",
    rebuttalFr: "Le blâme, c'est de la stigmatisation avec le sourire. Le VIH est un virus, pas un jugement moral.",
  },
];

const StigmaBingoGame = ({ t }) => {
  const { tr, lang } = useLang();
  // 5x5 grid with FREE in centre
  const build = () => {
    const shuffled = [...BINGO_PHRASES].sort(() => Math.random() - 0.5).slice(0, 24);
    const grid = [];
    let k = 0;
    for (let i = 0; i < 25; i++) {
      if (i === 12)
        grid.push({
          free: true,
          phrase: tr("FREE — Stigma Ends Here", "LIBRE — La stigmatisation s'arrête ici"),
          rebuttal: tr(
            "This square is yours. It marks the moment you decided to call stigma out.",
            "Cette case est la vôtre. Elle marque le moment où vous avez décidé de dénoncer la stigmatisation."
          ),
        });
      else {
        const p = shuffled[k];
        grid.push({
          ...p,
          phrase: lang === "fr" && p.phraseFr ? p.phraseFr : p.phrase,
          rebuttal: lang === "fr" && p.rebuttalFr ? p.rebuttalFr : p.rebuttal,
          free: false,
        });
        k++;
      }
    }
    return grid;
  };
  const [grid, setGrid] = useState(build);
  const [marked, setMarked] = useState<number[]>([12]);
  const [opened, setOpened] = useState<number | null>(null);

  const toggle = (i) => {
    if (i === 12) return;
    setOpened(i);
    setMarked((m) => (m.includes(i) ? m.filter((x) => x !== i) : [...m, i]));
  };

  const lines: number[][] = [];
  for (let r = 0; r < 5; r++) lines.push([0, 1, 2, 3, 4].map((c) => r * 5 + c));
  for (let c = 0; c < 5; c++) lines.push([0, 1, 2, 3, 4].map((r) => r * 5 + c));
  lines.push([0, 6, 12, 18, 24]);
  lines.push([4, 8, 12, 16, 20]);
  const bingo = lines.some((ln) => ln.every((i) => marked.includes(i)));

  const restart = () => {
    setGrid(build());
    setMarked([12]);
    setOpened(null);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: t.textMuted,
          }}
        >
          {tr(`Tapped: ${marked.length - 1}/24`, `Touchées : ${marked.length - 1}/24`)}
        </span>
        <button
          onClick={restart}
          style={{
            background: "none",
            border: `1.5px solid ${t.borderColor}`,
            borderRadius: 100,
            padding: "6px 14px",
            cursor: "pointer",
            color: t.text,
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {tr("Restart board", "Recommencer la grille")}
        </button>
      </div>
      {bingo && (
        <div
          style={{
            background: t.accent,
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 14,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 15,
              fontWeight: 800,
              color: t.primary,
            }}
          >
            {tr("BINGO — five in a row. Every one of those was a lie you have heard.", "BINGO — cinq alignées. Chacune de ces phrases est un mensonge que vous avez déjà entendu.")}
          </p>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
        {grid.map((cell, i) => {
          const isMarked = marked.includes(i);
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              title={cell.phrase}
              style={{
                aspectRatio: "1 / 1",
                padding: 6,
                borderRadius: 8,
                cursor: cell.free ? "default" : "pointer",
                border: `1.5px solid ${isMarked ? t.accent : t.borderColor}`,
                background: cell.free ? t.primary : isMarked ? t.accentLight : t.card,
                color: cell.free ? t.ivory : t.text,
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 10,
                fontWeight: 600,
                lineHeight: 1.25,
                textAlign: "center",
              }}
            >
              {cell.phrase}
            </button>
          );
        })}
      </div>
      {opened !== null && !grid[opened].free && (
        <div
          style={{
            marginTop: 16,
            background: t.isDark ? t.surface : t.accentLight,
            border: `1.5px solid ${t.borderColor}`,
            borderRadius: 12,
            padding: "16px 18px",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1.5px",
              color: t.accent,
              marginBottom: 6,
            }}
          >
            {tr("THE REBUTTAL", "LA RÉPONSE")}
          </p>
          <p
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: t.text,
              marginBottom: 8,
            }}
          >
            "{grid[opened].phrase}"
          </p>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 14,
              color: t.text,
              lineHeight: 1.65,
            }}
          >
            {grid[opened].rebuttal}
          </p>
        </div>
      )}
    </div>
  );
};

// ─── PREP ACCESS NAVIGATOR ────────────────────────────────────────────────────

const PREP_STEPS = [
  {
    prompt: "You've decided to look into PrEP. Where do you start?",
    promptFr: "Vous avez décidé de vous renseigner sur la PrEP. Par où commencer ?",
    label: "Your first move:",
    labelFr: "Votre premier geste :",
    choices: [
      {
        text: "Search 'PrEP Nigeria' and read from the Federal Ministry of Health and NACA.",
        textFr: "Rechercher « PrEP Nigéria » et lire les sources du Ministère fédéral de la Santé et de la NACA.",
        delta: 15,
        note: "Grounding in verified sources. Best possible start.",
        noteFr: "S'appuyer sur des sources vérifiées. Le meilleur départ possible.",
      },
      {
        text: "Ask in a group chat and take the first answer.",
        textFr: "Demander dans un groupe de discussion et prendre la première réponse.",
        delta: -10,
        note: "Group chats spread misinformation faster than facts. Verify before you decide.",
        noteFr: "Les groupes de discussion propagent la désinformation plus vite que les faits. Vérifiez avant de décider.",
      },
      {
        text: "Assume PrEP isn't available in Nigeria.",
        textFr: "Supposer que la PrEP n'est pas disponible au Nigéria.",
        delta: -20,
        note: "PrEP has been in Nigeria since 2017. Assumption is the first barrier to access.",
        noteFr: "La PrEP est présente au Nigéria depuis 2017. La supposition est le premier obstacle à l'accès.",
      },
    ],
  },
  {
    prompt:
      "You call your campus health centre and ask about PrEP. They say they don't offer it. What next?",
    promptFr:
      "Vous appelez le centre de santé de votre campus pour parler de la PrEP. On vous dit qu'ils ne la proposent pas. Que faites-vous ensuite ?",
    label: "Your next move:",
    labelFr: "Votre prochain geste :",
    choices: [
      {
        text: "Ask for a referral to the nearest public HIV treatment centre or PEPFAR-supported clinic.",
        textFr: "Demander une orientation vers le centre de traitement VIH public le plus proche ou une clinique soutenue par le PEPFAR.",
        delta: 20,
        note: "Referrals are a right. Campus clinics must connect you to a facility that does provide PrEP.",
        noteFr: "L'orientation est un droit. Les centres de santé du campus doivent vous mettre en relation avec un établissement qui propose la PrEP.",
      },
      {
        text: "Give up and hope for the best.",
        textFr: "Abandonner et espérer que tout s'arrange.",
        delta: -20,
        note: "PrEP is worth an extra call. Hope is not a prevention strategy.",
        noteFr: "La PrEP mérite un appel supplémentaire. L'espoir n'est pas une stratégie de prévention.",
      },
      {
        text: "Buy 'HIV prevention pills' online from an unknown seller.",
        textFr: "Acheter des « pilules de prévention du VIH » en ligne auprès d'un vendeur inconnu.",
        delta: -25,
        note: "Unverified drugs can be fake, expired, or harmful. Only take PrEP from a licensed provider.",
        noteFr: "Les médicaments non vérifiés peuvent être faux, périmés ou dangereux. Ne prenez la PrEP que d'un fournisseur agréé.",
      },
    ],
  },
  {
    prompt:
      "You reach a public health facility. Before starting PrEP, they need to do a rapid HIV test. How do you feel?",
    promptFr:
      "Vous arrivez dans un établissement de santé publique. Avant de commencer la PrEP, ils doivent faire un test de dépistage rapide du VIH. Que ressentez-vous ?",
    label: "Your response:",
    labelFr: "Votre réponse :",
    choices: [
      {
        text: "Take the test. It is required, confidential, and free.",
        textFr: "Faire le test. Il est obligatoire, confidentiel et gratuit.",
        delta: 15,
        note: "PrEP is only for people who are HIV negative. Testing first is standard, safe, and legally protected.",
        noteFr: "La PrEP est uniquement pour les personnes séronégatives. Le test préalable est standard, sûr et légalement protégé.",
      },
      {
        text: "Refuse the test and ask for the pills anyway.",
        textFr: "Refuser le test et demander les comprimés quand même.",
        delta: -15,
        note: "No responsible clinic will prescribe PrEP without an HIV test. This step protects you.",
        noteFr: "Aucune clinique responsable ne prescrira la PrEP sans test de dépistage. Cette étape vous protège.",
      },
      {
        text: "Panic about who might see the results.",
        textFr: "Paniquer à l'idée que quelqu'un puisse voir les résultats.",
        delta: -5,
        note: "Understandable — but your results are legally protected by the National Health Act. Take the test.",
        noteFr: "Compréhensible — mais vos résultats sont légalement protégés par la loi nationale sur la santé. Faites le test.",
      },
    ],
  },
  {
    prompt:
      "You test negative and get your first PrEP prescription. The nurse explains you need to take it daily. What do you do?",
    promptFr:
      "Votre test est négatif et vous recevez votre première prescription de PrEP. L'infirmier vous explique que vous devez la prendre tous les jours. Que faites-vous ?",
    label: "Your plan:",
    labelFr: "Votre plan :",
    choices: [
      {
        text: "Set a phone alarm and take it at the same time each day.",
        textFr: "Programmer une alarme sur votre téléphone et la prendre à la même heure chaque jour.",
        delta: 20,
        note: "Adherence is everything. Consistent daily dosing gives you up to 99% protection.",
        noteFr: "L'observance est essentielle. Une prise quotidienne régulière offre jusqu'à 99 % de protection.",
      },
      {
        text: "Take it when you remember, mostly.",
        textFr: "La prendre quand vous vous en souvenez, la plupart du temps.",
        delta: -10,
        note: "Missed doses reduce PrEP's effectiveness. Consistency is what makes it work.",
        noteFr: "Les prises manquées réduisent l'efficacité de la PrEP. C'est la régularité qui la rend efficace.",
      },
      {
        text: "Only take it when you think you might be at risk.",
        textFr: "Ne la prendre que lorsque vous pensez être à risque.",
        delta: -15,
        note: "Daily PrEP is not on-demand. Skipping doses leaves gaps in protection.",
        noteFr: "La PrEP quotidienne n'est pas à la demande. Sauter des prises laisse des failles dans la protection.",
      },
    ],
  },
  {
    prompt: "It's been three months. Time for your PrEP follow-up. What do you do?",
    promptFr: "Trois mois ont passé. C'est l'heure de votre suivi PrEP. Que faites-vous ?",
    label: "Your follow-up:",
    labelFr: "Votre suivi :",
    choices: [
      {
        text: "Return to the clinic for the free follow-up HIV test and prescription refill.",
        textFr: "Retourner à la clinique pour le test de suivi gratuit et le renouvellement de la prescription.",
        delta: 20,
        note: "Three-month reviews confirm you are still HIV negative and refill your PrEP. This is how the system works.",
        noteFr: "Les bilans trimestriels confirment que vous êtes toujours séronégatif et renouvellent votre PrEP. C'est ainsi que le système fonctionne.",
      },
      {
        text: "Skip the follow-up and keep taking whatever pills are left.",
        textFr: "Sauter le suivi et continuer à prendre les comprimés restants.",
        delta: -15,
        note: "Follow-ups are non-negotiable. Missing them means running out and losing protection.",
        noteFr: "Les suivis ne sont pas négociables. Les manquer signifie être à court et perdre la protection.",
      },
      {
        text: "Stop taking PrEP because 'you feel fine'.",
        textFr: "Arrêter de prendre la PrEP parce que « vous vous sentez bien ».",
        delta: -10,
        note: "PrEP works only while you take it. Stopping ends the protection.",
        noteFr: "La PrEP ne fonctionne que tant que vous la prenez. L'arrêter met fin à la protection.",
      },
    ],
  },
];

const PrEPNavigatorGame = ({ t }) => {
  const { tr, lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [access, setAccess] = useState(50);
  const [chosen, setChosen] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const step = PREP_STEPS[idx];
  const choose = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    setAccess((a) => Math.max(0, Math.min(100, a + step.choices[i].delta)));
  };
  const next = () => {
    if (idx + 1 >= PREP_STEPS.length) {
      setDone(true);
      return;
    }
    setIdx(idx + 1);
    setChosen(null);
  };
  const reset = () => {
    setIdx(0);
    setAccess(50);
    setChosen(null);
    setDone(false);
  };

  if (done) {
    const verdict =
      access >= 90
        ? tr("You navigated the system. You are actually on PrEP.", "Vous avez réussi à naviguer le système. Vous êtes bel et bien sous PrEP.")
        : access >= 70
          ? tr("You are close. A couple of choices cost you time, not access.", "Vous y êtes presque. Quelques choix vous ont coûté du temps, pas l'accès.")
          : access >= 40
            ? tr("You started but stalled. The barriers here are structural, not personal.", "Vous avez commencé mais avez stagné. Les obstacles ici sont structurels, pas personnels.")
            : tr("The system won this round. Try again — this time you know where it breaks.", "Le système a gagné cette manche. Réessayez — cette fois, vous savez où il flanche.");
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: t.primary,
          }}
        >
          {access}%
        </div>
        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: t.textMuted,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          {tr("Final Access Score", "Score d'accès final")}
        </p>
        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: t.text,
            marginTop: 20,
            maxWidth: 480,
            marginInline: "auto",
          }}
        >
          {verdict}
        </p>
        <div style={{ marginTop: 32 }}>
          <Btn t={t} variant="primary" onClick={reset}>
            {tr("Play Again", "Rejouer")}
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: t.textMuted,
          }}
        >
          {tr(`Step ${idx + 1} of ${PREP_STEPS.length}`, `Étape ${idx + 1} sur ${PREP_STEPS.length}`)}
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: t.accent,
          }}
        >
          {tr(`Access: ${access}%`, `Accès : ${access} %`)}
        </span>
      </div>
      <ProgressBar t={t} value={access} max={100} />
      <div
        style={{ background: t.primary, borderRadius: 14, padding: "26px 22px", marginBottom: 20 }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "1.5px",
            color: t.accent,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {tr("The Situation", "La situation")}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 16,
            color: t.ivory,
            lineHeight: 1.7,
          }}
        >
          {lang === "fr" && step.promptFr ? step.promptFr : step.prompt}
        </p>
      </div>
      <p
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: t.textMuted,
          marginBottom: 10,
        }}
      >
        {lang === "fr" && step.labelFr ? step.labelFr : step.label}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {step.choices.map((c, i) => {
          let bg = t.card,
            border = t.borderColor,
            color = t.text;
          if (chosen !== null) {
            if (i === chosen) {
              const good = c.delta > 0;
              bg = good ? t.accentLight : "#FFE8E8";
              border = good ? t.accent : "#E88";
              color = good ? t.primary : "#C00";
            }
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              style={{
                background: bg,
                border: `1.5px solid ${border}`,
                borderRadius: 10,
                padding: "14px 18px",
                textAlign: "left",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 15,
                color,
                cursor: chosen !== null ? "default" : "pointer",
                lineHeight: 1.5,
              }}
            >
              {lang === "fr" && c.textFr ? c.textFr : c.text}
            </button>
          );
        })}
      </div>
      {chosen !== null && (
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              background: t.isDark ? t.surface : t.accentLight,
              border: `1.5px solid ${t.borderColor}`,
              borderRadius: 10,
              padding: "16px 18px",
              marginBottom: 14,
            }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: step.choices[chosen].delta > 0 ? t.primary : "#C00",
                marginBottom: 6,
              }}
            >
              {step.choices[chosen].delta > 0
                ? tr(`+${step.choices[chosen].delta}% access`, `+${step.choices[chosen].delta} % d'accès`)
                : tr(`${step.choices[chosen].delta}% access`, `${step.choices[chosen].delta} % d'accès`)}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                color: t.text,
                lineHeight: 1.65,
              }}
            >
              {lang === "fr" && step.choices[chosen].noteFr ? step.choices[chosen].noteFr : step.choices[chosen].note}
            </p>
          </div>
          <Btn
            t={t}
            variant="primary"
            onClick={next}
            style={{ width: "100%", textAlign: "center" }}
          >
            {idx + 1 >= PREP_STEPS.length ? tr("See Final Score", "Voir le score final") : tr("Next Step →", "Étape suivante →")}
          </Btn>
        </div>
      )}
    </div>
  );
};

// ─── MENTAL HEALTH CHECK-IN ───────────────────────────────────────────────────

const CHECKIN_QUESTIONS = [
  {
    q: "How rested do you feel today?",
    qFr: "À quel point vous sentez-vous reposé aujourd'hui ?",
    labels: ["Running on empty", "Getting by", "Okay", "Rested", "Fully charged"],
    labelsFr: ["À bout de forces", "Je fais aller", "Ça va", "Reposé", "Pleinement rechargé"],
  },
  {
    q: "How connected do you feel to the people around you?",
    qFr: "À quel point vous sentez-vous connecté aux personnes qui vous entourent ?",
    labels: ["Isolated", "Distant", "Somewhat", "Connected", "Deeply held"],
    labelsFr: ["Isolé", "Distant", "Un peu", "Connecté", "Profondément entouré"],
  },
  {
    q: "How heavy has your mind felt this week?",
    qFr: "À quel point votre esprit s'est-il senti lourd cette semaine ?",
    labels: ["Very heavy", "Heavy", "Mixed", "Light", "Very light"],
    labelsFr: ["Très lourd", "Lourd", "Mitigé", "Léger", "Très léger"],
  },
  {
    q: "How safe do you feel being yourself on campus right now?",
    qFr: "À quel point vous sentez-vous en sécurité d'être vous-même sur le campus en ce moment ?",
    labels: ["Not safe", "Cautious", "Mixed", "Mostly safe", "Fully safe"],
    labelsFr: ["Pas en sécurité", "Prudent", "Mitigé", "Plutôt en sécurité", "Pleinement en sécurité"],
  },
  {
    q: "How supported do you feel in what you are carrying?",
    qFr: "À quel point vous sentez-vous soutenu dans ce que vous portez ?",
    labels: ["Alone", "Barely", "Some support", "Supported", "Deeply supported"],
    labelsFr: ["Seul", "À peine", "Un peu de soutien", "Soutenu", "Profondément soutenu"],
  },
  {
    q: "How hopeful do you feel about this week?",
    qFr: "À quel point vous sentez-vous plein d'espoir pour cette semaine ?",
    labels: ["Not at all", "A little", "Neutral", "Hopeful", "Very hopeful"],
    labelsFr: ["Pas du tout", "Un peu", "Neutre", "Plein d'espoir", "Très plein d'espoir"],
  },
];

const MentalHealthCheckIn = ({ t }) => {
  const { tr, lang } = useLang();
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(CHECKIN_QUESTIONS.length).fill(null),
  );
  const [done, setDone] = useState(false);
  const complete = answers.every((a) => a !== null);

  const reflection = () => {
    const avg = answers.reduce<number>((s, v) => s + (v ?? 0), 0) / answers.length;
    if (avg <= 1.5)
      return {
        title: tr("You are carrying a lot right now.", "Vous portez beaucoup de choses en ce moment."),
        body: tr(
          "This week has been heavy. That is real. Please consider reaching out to someone you trust, a campus counsellor, or a peer circle. You do not have to carry this alone. Text 'HELP' to a friend today — one message.",
          "Cette semaine a été lourde. C'est réel. Envisagez de contacter une personne de confiance, un conseiller du campus, ou un cercle de pairs. Vous n'avez pas à porter cela seul. Envoyez « AIDE » à un ami aujourd'hui — un seul message."
        ),
      };
    if (avg <= 2.5)
      return {
        title: tr("You are holding on, but the edges are showing.", "Vous tenez bon, mais les fissures se voient."),
        body: tr(
          "You are managing, and managing is not nothing. Notice what one small kindness could look like for you this week — an early night, a phone call, ten minutes outside. Small acts refill quietly.",
          "Vous gérez, et gérer n'est pas rien. Remarquez à quoi pourrait ressembler une petite bienveillance pour vous cette semaine — une nuit plus tôt, un appel téléphonique, dix minutes dehors. Les petits gestes rechargent en silence."
        ),
      };
    if (avg <= 3.5)
      return {
        title: tr("You are steady. Not soaring, not sinking.", "Vous êtes stable. Ni en plein essor, ni en train de sombrer."),
        body: tr(
          "This is a real place to be. Steady is a foundation. If there is one dimension pulling low, gently name it. You do not have to fix it today — just see it.",
          "C'est un endroit réel où être. La stabilité est une fondation. S'il y a une dimension qui tire vers le bas, nommez-la doucement. Vous n'avez pas à la résoudre aujourd'hui — juste à la voir."
        ),
      };
    return {
      title: tr("You are in a full week.", "Vous vivez une semaine pleine."),
      body: tr(
        "Rested, connected, hopeful. Hold this. Notice what has made it feel this way, because that is knowledge your future self will need on a harder week.",
        "Reposé, connecté, plein d'espoir. Retenez cela. Remarquez ce qui a rendu cette semaine ainsi, car c'est une connaissance dont votre futur vous aura besoin lors d'une semaine plus difficile."
      ),
    };
  };

  if (done) {
    const r = reflection();
    return (
      <div style={{ padding: "20px 0" }}>
        <p
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "1.5px",
            color: t.accent,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {tr("Your Reflection", "Votre réflexion")}
        </p>
        <h3
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 26,
            fontWeight: 800,
            color: t.text,
            lineHeight: 1.25,
            marginBottom: 16,
          }}
        >
          {r.title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 16,
            color: t.text,
            lineHeight: 1.75,
            marginBottom: 24,
          }}
        >
          {r.body}
        </p>
        <div
          style={{
            background: t.isDark ? t.surface : t.accentLight,
            border: `1px solid ${t.borderColor}`,
            borderRadius: 12,
            padding: "18px 20px",
            marginBottom: 24,
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 14,
              color: t.textMuted,
              lineHeight: 1.7,
            }}
          >
            {tr(
              "These answers never leave your browser. There is no score. This was only ever meant as a quiet moment to notice where you actually are.",
              "Ces réponses ne quittent jamais votre navigateur. Il n'y a pas de score. Ceci n'a jamais été qu'un moment calme pour observer où vous en êtes réellement."
            )}
          </p>
        </div>
        <Btn
          t={t}
          variant="primary"
          onClick={() => {
            setAnswers(Array(CHECKIN_QUESTIONS.length).fill(null));
            setDone(false);
          }}
        >
          {tr("Check in again", "Refaire le point")}
        </Btn>
      </div>
    );
  }

  return (
    <div>
      <p
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 15,
          color: t.textMuted,
          lineHeight: 1.7,
          marginBottom: 28,
        }}
      >
        {tr("Six quiet questions. No score. No judgement. Your answers never leave your browser.", "Six questions tranquilles. Aucun score. Aucun jugement. Vos réponses ne quittent jamais votre navigateur.")}
      </p>
      {CHECKIN_QUESTIONS.map((cq, qi) => (
        <div key={qi} style={{ marginBottom: 28 }}>
          <p
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 16,
              fontWeight: 700,
              color: t.text,
              marginBottom: 12,
            }}
          >
            {lang === "fr" && cq.qFr ? cq.qFr : cq.q}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
            {(lang === "fr" && cq.labelsFr ? cq.labelsFr : cq.labels).map((lbl, li) => {
              const active = answers[qi] === li;
              return (
                <button
                  key={li}
                  onClick={() => setAnswers((a) => a.map((v, k) => (k === qi ? li : v)))}
                  style={{
                    padding: "10px 4px",
                    borderRadius: 8,
                    cursor: "pointer",
                    border: `1.5px solid ${active ? t.accent : t.borderColor}`,
                    background: active ? t.accentLight : t.card,
                    color: t.text,
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 11,
                    fontWeight: active ? 700 : 500,
                    lineHeight: 1.3,
                  }}
                >
                  {lbl}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <Btn
        t={t}
        variant="primary"
        disabled={!complete}
        onClick={() => complete && setDone(true)}
        style={{ width: "100%", textAlign: "center", opacity: complete ? 1 : 0.5 }}
      >
        {complete ? tr("See my reflection", "Voir ma réflexion") : tr("Answer all six to continue.", "Répondez aux six questions pour continuer.")}
      </Btn>
    </div>
  );
};

// ─── GAMES PAGE ───────────────────────────────────────────────────────────────

export const GamesPage = ({ t, setPage }) => {
  const { tr } = useLang();
  const [activeGame, setActiveGame] = useState(null);
  const games = [
    {
      id: "myth",
      title: tr("Myth Buster", "Démystificateur"),
      tag: tr("HIV EDUCATION", "ÉDUCATION AU VIH"),
      description: tr(
        "10 cards. Each one is a statement about HIV. You decide: Myth or Fact. The truth might surprise you.",
        "10 cartes. Chacune est une affirmation sur le VIH. À vous de décider : mythe ou fait. La vérité pourrait vous surprendre."
      ),
      time: tr("5 min", "5 min"),
      difficulty: tr("Beginner friendly", "Accessible aux débutants"),
      component: <MythBusterGame t={t} />,
    },
    {
      id: "quiz",
      title: tr("LUMA Challenge", "Défi LUMA"),
      tag: tr("KNOWLEDGE QUIZ", "QUIZ DE CONNAISSANCES"),
      description: tr(
        "10 questions. 20 seconds each. How well do you really know HIV, PrEP, campus rights, and the status neutral approach?",
        "10 questions. 20 secondes chacune. Connaissez-vous vraiment le VIH, la PrEP, les droits sur le campus et l'approche « statut neutre » ?"
      ),
      time: tr("4 min", "4 min"),
      difficulty: tr("Intermediate", "Intermédiaire"),
      component: <QuizGame t={t} />,
    },
    {
      id: "scenario",
      title: tr("Campus Quest", "Quête du Campus"),
      tag: tr("SCENARIO GAME", "JEU DE SCÉNARIOS"),
      description: tr(
        "5 real campus scenarios involving HIV, stigma, and allyship. What would you actually do? Your choices reveal your instincts.",
        "5 scénarios de campus réels impliquant le VIH, la stigmatisation et la solidarité. Que feriez-vous réellement ? Vos choix révèlent vos instincts."
      ),
      time: tr("6 min", "6 min"),
      difficulty: tr("Reflective", "Réflexif"),
      component: <ScenarioGame t={t} />,
    },
    {
      id: "scramble",
      title: tr("Word Scramble", "Mots mélangés"),
      tag: tr("HIV TERMS", "TERMES DU VIH"),
      description: tr(
        "Eight scrambled words from the HIV response vocabulary. Unscramble each one with a clue.",
        "Huit mots mélangés du vocabulaire de la riposte au VIH. Démêlez chacun d'eux à l'aide d'un indice."
      ),
      time: tr("3 min", "3 min"),
      difficulty: tr("All levels", "Tous niveaux"),
      component: <WordScrambleGame t={t} />,
    },
    {
      id: "memory",
      title: tr("Memory Match", "Jeu de mémoire"),
      tag: tr("CAMPUS RIGHTS", "DROITS SUR LE CAMPUS"),
      description: tr(
        "Flip two cards. Match each student right with the law or framework that protects it.",
        "Retournez deux cartes. Associez chaque droit étudiant à la loi ou au cadre qui le protège."
      ),
      time: tr("4 min", "4 min"),
      difficulty: tr("All levels", "Tous niveaux"),
      component: <MemoryMatchGame t={t} />,
    },
    {
      id: "bingo",
      title: tr("Stigma Bingo", "Bingo de la stigmatisation"),
      tag: tr("CALL IT OUT", "DÉNONCEZ-LE"),
      description: tr(
        "A 5x5 board of real stigmatising phrases heard on Nigerian campuses. Tap every one you've heard. Get five in a row to win — and read the rebuttal.",
        "Une grille 5x5 de vraies phrases stigmatisantes entendues sur les campus nigérians. Cochez chacune que vous avez entendue. Alignez-en cinq pour gagner — et lisez la réponse."
      ),
      time: tr("5 min", "5 min"),
      difficulty: tr("All levels", "Tous niveaux"),
      component: <StigmaBingoGame t={t} />,
    },
    {
      id: "prep",
      title: tr("PrEP Access Navigator", "Navigateur d'accès à la PrEP"),
      tag: tr("PRACTICAL", "PRATIQUE"),
      description: tr(
        "Walk the real journey from curiosity to prescription. Every choice moves your access score up or down.",
        "Parcourez le véritable chemin de la curiosité à la prescription. Chaque choix fait monter ou descendre votre score d'accès."
      ),
      time: tr("6 min", "6 min"),
      difficulty: tr("Practical", "Pratique"),
      component: <PrEPNavigatorGame t={t} />,
    },
    {
      id: "wellbeing",
      title: tr("Mental Health Check-In", "Bilan de santé mentale"),
      tag: tr("WELLBEING", "BIEN-ÊTRE"),
      description: tr(
        "Six quiet questions. No score, no judgement — a private moment to notice where you actually are this week.",
        "Six questions tranquilles. Aucun score, aucun jugement — un moment privé pour observer où vous en êtes réellement cette semaine."
      ),
      time: tr("4 min", "4 min"),
      difficulty: tr("Reflective", "Réflexif"),
      component: <MentalHealthCheckIn t={t} />,
    },
  ];

  if (activeGame) {
    const game = games.find((g) => g.id === activeGame);
    return (
      <div>
        <div style={{ background: t.primary, padding: "100px 32px 60px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <button
              onClick={() => setActiveGame(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(247,243,236,0.7)",
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 14,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: 0,
                marginBottom: 32,
              }}
            >
              <ArrowLeft color="rgba(247,243,236,0.7)" size={14} /> {tr("Back to Games", "Retour aux jeux")}
            </button>
            <Tag t={t} light>
              {game.tag}
            </Tag>
            <h1
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(28px,4.5vw,52px)",
                fontWeight: 800,
                color: t.ivory,
                lineHeight: 1.15,
                marginTop: 16,
              }}
            >
              {game.title}
            </h1>
          </div>
        </div>
        <section style={{ padding: "48px 32px", background: t.bg }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>{game.component}</div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <div style={{ background: t.primary, padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Tag t={t} light>
            {tr("LUMA Games", "Jeux LUMA")}
          </Tag>
          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 800,
              color: t.ivory,
              lineHeight: 1.1,
              marginTop: 16,
            }}
          >
            {tr("Learn through play.", "Apprendre en jouant.")}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 18,
              color: "rgba(247,243,236,0.72)",
              lineHeight: 1.7,
              maxWidth: 620,
              marginTop: 16,
            }}
          >
            {tr(
              "Games that do not just test what you know. They change what you do with what you know.",
              "Des jeux qui ne se contentent pas de tester ce que vous savez. Ils changent ce que vous faites de ce que vous savez."
            )}
          </p>
        </div>
      </div>
      <section style={{ padding: "80px 32px", background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 28,
              marginBottom: 72,
            }}
          >
            {games.map((game) => (
              <Card
                key={game.id}
                t={t}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onClick={() => setActiveGame(game.id)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div>
                  <Tag t={t}>{game.tag}</Tag>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontSize: 24,
                      fontWeight: 800,
                      color: t.text,
                      marginTop: 16,
                      marginBottom: 12,
                    }}
                  >
                    {game.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 15,
                      color: t.textMuted,
                      lineHeight: 1.7,
                      marginBottom: 24,
                    }}
                  >
                    {game.description}
                  </p>
                  <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
                    <span
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 13,
                        color: t.textMuted,
                      }}
                    >
                      ⏱ {game.time}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 13,
                        color: t.textMuted,
                      }}
                    >
                      🎯 {game.difficulty}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    background: t.primary,
                    color: t.ivory,
                    padding: "14px 24px",
                    borderRadius: 100,
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {tr("Play Now →", "Jouer maintenant →")}
                </div>
              </Card>
            ))}
          </div>
          <div
            style={{
              background: t.isDark ? t.card : t.accentLight,
              border: `1px solid ${t.borderColor}`,
              borderRadius: 20,
              padding: "40px 32px",
              textAlign: "center",
            }}
          >
            <SectionLabel t={t}>{tr("Eight games. One bridge.", "Huit jeux. Un seul pont.")}</SectionLabel>
            <h2
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 24,
                fontWeight: 800,
                color: t.text,
                marginTop: 12,
                marginBottom: 10,
              }}
            >
              {tr("From what you know to what you do.", "De ce que vous savez à ce que vous faites.")}
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 15,
                color: t.textMuted,
                lineHeight: 1.7,
                maxWidth: 560,
                marginInline: "auto",
              }}
            >
              {tr(
                "Every game above closes a different corner of the Information-to-Action gap — myths, vocabulary, rights, stigma, PrEP access, and mental health.",
                "Chaque jeu ci-dessus comble un aspect différent de l'écart entre l'information et l'action — mythes, vocabulaire, droits, stigmatisation, accès à la PrEP et santé mentale."
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── THEME CONTEXT + SHELL ────────────────────────────────────────────────────

import { createContext, useContext } from "react";
import { Outlet, useRouter, useRouterState } from "@tanstack/react-router";

const ThemeCtx: any = createContext(null);
export const useLumaTheme = (): any => useContext(ThemeCtx);

const PAGE_TO_ROUTE = {
  home: "/",
  about: "/about",
  work: "/work",
  truth: "/truth",
  circle: "/circle",
  advocacy: "/advocacy",
  resources: "/resources",
  involve: "/involve",
  contact: "/contact",
  games: "/games",
  ambassador: "/apply/ambassador",
  volunteer: "/apply/volunteer",
  partner: "/apply/partner",
};
const ROUTE_TO_PAGE = Object.fromEntries(Object.entries(PAGE_TO_ROUTE).map(([k, v]) => [v, k]));

export const useNavToPage = () => {
  const router = useRouter();
  return (id) => {
    if (id === "story") return;
    if (typeof id === "string" && id.startsWith("guide:")) {
      const guideId = id.slice("guide:".length);
      router.navigate({ to: "/resources/$guideId", params: { guideId } });
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        // scrollTo unsupported
      }
      return;
    }
    const to = PAGE_TO_ROUTE[id];
    if (!to) return;
    router.navigate({ to });
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      // scrollTo unsupported
    }
  };
};

export const useNavToStory = () => {
  const router = useRouter();
  return (storyId) => {
    router.navigate({ to: "/truth/$storyId", params: { storyId } });
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      // scrollTo unsupported
    }
  };
};

export function ThemeProvider({ children }) {
  const [colorId, setColorId] = useState("watcher");
  const [isDark, setIsDark] = useState(false);
  const t = getTheme(colorId, isDark);
  return (
    <ThemeCtx.Provider value={{ t, colorId, setColorId, isDark, setIsDark }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function LumaShell({ children }) {
  const { t, colorId, setColorId, isDark, setIsDark } = useLumaTheme();
  const setPage = useNavToPage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // derive `page` for nav active-state
  let page = ROUTE_TO_PAGE[pathname] || "home";
  if (pathname.startsWith("/truth")) page = "truth";

  return (
    <div
      style={{
        fontFamily: "'Space Grotesk',sans-serif",
        background: t.bg,
        minHeight: "100vh",
        transition: "background 0.3s ease",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{overflow-x:hidden;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-thumb{background:${t.accent};border-radius:3px;}
        button{cursor:pointer;}
        button:hover{opacity:0.9;}
        a{text-decoration:none;}
        input::placeholder,textarea::placeholder{color:${t.textMuted};}
        select option{background:${t.surface};color:${t.text};}
        @media(max-width:768px){
          .desktop-nav{display:none !important;}
          .mobile-menu-btn{display:flex !important;}
          .desktop-theme-controls{display:none !important;}
        }
      `}</style>
      <Nav
        t={t}
        colorId={colorId}
        setColorId={setColorId}
        isDark={isDark}
        setIsDark={setIsDark}
        page={page}
        setPage={setPage}
      />
      <main>{children}</main>
      <Footer t={t} setPage={setPage} />
    </div>
  );
}
