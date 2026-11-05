"""Generate clearly watermarked, fictional two-page demo PDFs. No source DB used."""
import json
import os
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
font_dir = Path(os.environ.get("DEMO_FONT_DIR", "C:/Windows/Fonts"))
pdfmetrics.registerFont(TTFont("DemoSans", str(font_dir / "arial.ttf")))
pdfmetrics.registerFont(TTFont("DemoBold", str(font_dir / "arialbd.ttf")))
blue = colors.HexColor("#153C88")
styles = {
    "body": ParagraphStyle("body", fontName="DemoSans", fontSize=11, leading=19, spaceAfter=12, textColor=colors.HexColor("#334155"), alignment=TA_JUSTIFY),
    "title": ParagraphStyle("title", fontName="DemoBold", fontSize=16, leading=24, alignment=TA_CENTER, textColor=blue, spaceAfter=18),
    "subtitle": ParagraphStyle("subtitle", fontName="DemoBold", fontSize=12, leading=20, textColor=blue, spaceAfter=12),
    "small": ParagraphStyle("small", fontName="DemoSans", fontSize=9, leading=15, textColor=colors.HexColor("#64748B")),
    "center": ParagraphStyle("center", fontName="DemoSans", fontSize=10, leading=17, alignment=TA_CENTER, spaceAfter=18, textColor=colors.HexColor("#64748B")),
}

def page_frame(canvas, doc):
    w, h = A4
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#F1F4F8"))
    canvas.translate(w / 2, h / 2)
    canvas.rotate(38)
    canvas.setFont("DemoBold", 68)
    canvas.drawCentredString(0, 0, "BẢN DEMO")
    canvas.restoreState()
    canvas.saveState()
    canvas.setFillColor(blue)
    canvas.setFont("DemoBold", 9)
    canvas.drawString(52, h - 44, "CỔNG THÔNG TIN VĂN BẢN CÔNG KHAI HaUI")
    canvas.setFont("DemoSans", 8)
    canvas.setFillColor(colors.HexColor("#B08733"))
    canvas.drawRightString(w - 52, h - 44, "DỮ LIỆU MINH HỌA")
    canvas.setStrokeColor(colors.HexColor("#E2E8F0"))
    canvas.line(52, h - 55, w - 52, h - 55)
    canvas.line(52, 47, w - 52, 47)
    canvas.setFont("DemoSans", 8)
    canvas.setFillColor(colors.HexColor("#94A3B8"))
    canvas.drawString(52, 32, "Không phải văn bản chính thức. Không có giá trị áp dụng.")
    canvas.drawRightString(w - 52, 32, f"Trang {doc.page} / 2")
    canvas.restoreState()

out = ROOT / "data" / "pdf"
out.mkdir(parents=True, exist_ok=True)
records = json.loads((ROOT / "data" / "demo-documents.json").read_text(encoding="utf-8"))
for record in records:
    title = escape(record["title"])
    sign = escape(record["sign"])
    story = [Spacer(1, 14), Paragraph(record["type"].upper() + " (MINH HỌA)", styles["title"]), Paragraph(title, styles["title"]), Paragraph(f"Số: {sign} · Ngày mẫu: {'/'.join(record['issuedAt'].split('-')[::-1])}", styles["center"]), Spacer(1, 12)]
    story.extend([
      Paragraph("1. Mục đích của tài liệu", styles["subtitle"]),
      Paragraph("Tài liệu được tạo riêng để minh họa trải nghiệm tra cứu, xem và tải văn bản trên bản demo Cổng thông tin văn bản công khai của Đại học Công nghiệp Hà Nội. Đây không phải văn bản do nhà trường ban hành.", styles["body"]),
      Paragraph("2. Nội dung minh họa", styles["subtitle"]),
      Paragraph(f"Chủ đề: {title}. Lĩnh vực minh họa: {escape(record['field'])}. Người xem có thể sử dụng giao diện để kiểm tra cách trình bày thông tin, sự rõ ràng của chữ viết và tính thuận tiện khi đọc trên máy tính hoặc điện thoại.", styles["body"]),
      Paragraph("3. Phạm vi trải nghiệm", styles["subtitle"]),
      Paragraph("Các chức năng bao gồm tìm kiếm theo số ký hiệu hoặc trích yếu, lựa chọn bộ lọc, xem thông tin chi tiết, chuyển trang PDF, phóng to nội dung và lưu văn bản để đọc sau.", styles["body"]),
      Paragraph("Không có chữ ký, con dấu hoặc phê duyệt thật trong tài liệu mẫu. Mọi tên văn bản, số ký hiệu và thời gian chỉ có tính chất giả lập.", styles["body"]),
      PageBreak(), Spacer(1, 14), Paragraph("PHỤ LỤC MINH HỌA", styles["title"]), Paragraph("Thông tin phục vụ đánh giá giao diện", styles["center"]),
    ])
    rows = [[Paragraph("NỘI DUNG", styles["small"]), Paragraph("THÔNG TIN MẪU", styles["small"])]]
    for label, value in [("Số ký hiệu", record["sign"]), ("Loại văn bản", record["type"]), ("Lĩnh vực", record["field"]), ("Đơn vị minh họa", record["issuer"]), ("Cho phép tải trong demo", "Có" if record["allowDownload"] else "Không"), ("Nguồn dữ liệu", "Tạo mới hoàn toàn, không sử dụng dữ liệu E-Gov")]:
        rows.append([Paragraph(escape(label), styles["small"]), Paragraph(escape(value), styles["small"])])
    table = Table(rows, colWidths=[150, 340], hAlign="LEFT")
    table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#EDF3FC")), ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("TOPPADDING", (0, 0), (-1, -1), 12), ("BOTTOMPADDING", (0, 0), (-1, -1), 12), ("LEFTPADDING", (0, 0), (-1, -1), 12)]))
    story += [table, Spacer(1, 30), Paragraph("Ghi chú sử dụng", styles["subtitle"]), Paragraph("Tài liệu này chỉ phục vụ đánh giá thiết kế và hành vi giao diện. Khi triển khai chính thức, nội dung và tệp phải được cơ quan có thẩm quyền rà soát, phê duyệt riêng trước khi công khai.", styles["body"]), Paragraph("BẢN DEMO - KHÔNG CÓ GIÁ TRỊ ÁP DỤNG", styles["center"])]
    pdf = SimpleDocTemplate(str(out / f"{record['id']}.pdf"), pagesize=A4, rightMargin=52, leftMargin=52, topMargin=74, bottomMargin=65, title=f"DEMO - {record['title']}", author="HaUI Portal UI Demo")
    pdf.build(story, onFirstPage=page_frame, onLaterPages=page_frame)
print(f"Generated {len(records)} fictional PDFs in {out}")
