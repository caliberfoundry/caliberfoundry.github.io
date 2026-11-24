"""
AcademyForge™ (EdTech Studio v2.0) — Server-Side SCORM 1.2 Package Compiler
==========================================================================
Compiles structured EN / 한국어 multilingual STEM, B2B SaaS Academy, and Clinical
Compliance curriculum specs into standards-compliant ADL SCORM 1.2 (.zip) archives
for Canvas, Moodle, Blackboard, Docebo, and TalentLMS.
"""

from __future__ import annotations

import os
import zipfile
from datetime import datetime, timezone
from html import escape
from typing import Any, Dict


def build_imsmanifest_xml(course_id: str, course_title: str, mastery_score: int = 80) -> str:
    safe_id = escape(course_id, quote=True)
    safe_title = escape(course_title, quote=True)
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<manifest identifier="{safe_id}" version="1.2"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG_ACADEMYFORGE_01">
    <organization identifier="ORG_ACADEMYFORGE_01">
      <title>{safe_title}</title>
      <item identifier="ITEM_SCO_01" identifierref="RES_SCO_01" isvisible="true">
        <title>{safe_title} — Interactive SCO</title>
        <adlcp:masteryscore>{int(mastery_score)}</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES_SCO_01" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
      <file href="scorm_api_wrapper.js"/>
    </resource>
  </resources>
</manifest>
"""


def compile_scorm_zip(output_zip_path: str, course_meta: Dict[str, Any]) -> str:
    base_dir = os.path.dirname(os.path.abspath(__file__))
    manifest_xml = build_imsmanifest_xml(
        course_id=course_meta.get("course_id", "ACADEMYFORGE_SCORM12_2026"),
        course_title=course_meta.get("title", "AcademyForge Bilingual STEM & B2B Certification Module"),
        mastery_score=course_meta.get("mastery_score", 80),
    )

    with zipfile.ZipFile(output_zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("imsmanifest.xml", manifest_xml)
        for filename in ("index.html", "scorm_and_ttl_engine.js"):
            fpath = os.path.join(base_dir, filename)
            if os.path.exists(fpath):
                zf.write(fpath, arcname=filename)

    return output_zip_path


if __name__ == "__main__":
    meta = {
        "course_id": "ACADEMYFORGE_STEMINNO_EN_KO_2026",
        "title": "EN / 한국어 Multilingual STEM & Robotics Curriculum Module",
        "mastery_score": 80,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
    print("AcademyForge v2.0 SCORM 1.2 Manifest Preview:\n", build_imsmanifest_xml(meta["course_id"], meta["title"]))
