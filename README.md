# ExamFormTools

ExamFormTools is a free, web-based application designed to simplify document processing for exam applications in India. It provides essential tools to resize photos, signatures, and compress PDFs to meet the exact specifications required by various competitive exams like SSC, UPSC, Banking, Railway, and State exams.

## Features

- **100% Free**: No registration, no hidden fees, completely free forever
- **Secure Processing**: All processing happens in your browser - files never leave your device
- **Instant Results**: Lightning-fast processing with live previews
- **99.8% Accuracy**: Exam-approved dimensions and file sizes
- **No Watermarks**: Clean, professional output ready for official submissions
- **Multi-Format Support**: Handles JPG, PNG, WebP, and PDF files
- **Mobile-Friendly**: Works seamlessly on all devices

## Supported Exam Categories

### Major Central Government Exams

#### Civil Services & Administrative
- UPSC Civil Services Exam (CSE) – IAS, IPS, IFS, IRS
- UPSC CAPF (AC) – Assistant Commandant (CRPF, BSF, CISF, ITBP, SSB)
- UPSC CDS – Combined Defence Services
- UPSC NDA & NA – National Defence Academy
- UPSC IES / ESE – Engineering Services
- UPSC CMS – Combined Medical Services
- **Photo**: 40-240 KB, JPG format
- **Signature**: 10-40 KB, JPG format

#### Banking Exams
- IBPS PO – Probationary Officer
- IBPS Clerk
- IBPS SO – Specialist Officer
- SBI PO
- SBI Clerk
- RBI Grade B
- RBI Assistant
- NABARD Grade A & B
- **Photo**: 20-50 KB, JPG/JPEG
- **Signature**: 10-20 KB, JPG/JPEG

#### SSC Exams
- SSC CGL – Combined Graduate Level
- SSC CHSL – 10+2 Level
- SSC MTS – Multi Tasking Staff
- SSC GD Constable
- SSC JE – Junior Engineer
- SSC Stenographer
- **Photo**: 4-12 KB, JPG/JPEG only
- **Signature**: 1-12 KB, JPG/JPEG only

#### Railway Exams
- RRB NTPC
- RRB Group D
- RRB JE
- RRB ALP – Assistant Loco Pilot
- **Photo**: 15-40 KB, JPG format
- **Signature**: 5-20 KB, JPG format

#### Teaching (Central)
- CTET – Central Teacher Eligibility Test
- KVS / NVS Exams – Kendriya & Navodaya Vidyalaya

#### Defence & Paramilitary
- AFCAT – Air Force Common Admission Test
- Indian Navy SSR / AA
- Indian Army Agniveer
- BSF / CISF / CRPF / ITBP Exams

### Major State Government Exams

#### State Public Service Commission (PCS)
- UPPSC PCS – Uttar Pradesh
- BPSC – Bihar
- MPPSC – Madhya Pradesh
- RPSC – Rajasthan
- MPSC – Maharashtra
- WBPSC – West Bengal
- TNPSC – Tamil Nadu
- APPSC / TSPSC – Andhra Pradesh / Telangana
- KPSC – Karnataka

#### State Police Exams
- State Police Constable
- Sub-Inspector (SI)
- DSP (via PSC)

#### State Teaching Exams
- State TET (UPTET, REET, CTET-linked state exams)
- Primary Teacher / TGT / PGT Exams
- Assistant Professor (State PSC)

#### State SSC & Other Exams
- State SSC (e.g., UPSSSC, RSMSSB)
- Forest Guard / VDO / Patwari
- Clerk & Secretariat Exams

#### State Judiciary
- Civil Judge (PCS-J)
- Judicial Services Exam
- **Photo**: 10-50 KB, JPG/JPEG
- **Signature**: 5-20 KB, JPG/JPEG

### Entrance Exams
- JEE & NEET
- **Photo**: 10-200 KB, JPG/JPEG
- **Signature**: 4-30 KB, JPG/JPEG

## Tools

### Photo Resize
Resize and compress photos to exact exam specifications. Supports custom dimensions and quality adjustment.

### Signature Resize
Format signatures for applications with precise size controls and quality optimization.

### PDF Compress
Reduce PDF file size while maintaining readability and quality. Supports multiple compression levels.

### Document Convert
Convert images to PDF format for document submissions.

## New Features

### Dynamic Exam Requirements
- **Structured JSON Data**: Exam specifications are stored in `exam-requirements.json` for easy maintenance and updates
- **Dynamic Loading**: JavaScript modules (`category-requirements-loader.js`, `exam-requirements-loader.js`) dynamically load exam requirements
- **Real-time Updates**: Requirements can be updated without code changes, ensuring accuracy for latest exam specifications

### Enhanced User Experience
- **Category-specific Logos**: Visual exam category logos in SVG format for better recognition
- **Comprehensive Favicon Set**: Multi-resolution favicons for optimal display across devices and platforms
- **Responsive Design**: Optimized for mobile devices with touch-friendly interfaces

## Project Structure

```
examformtools/
├── index.html                 # Homepage
├── README.md                  # Project documentation
├── robots.txt                 # Search engine crawling rules
├── sitemap.xml               # Site structure for search engines
├── ads.txt                   # Ad network verification
├── assets/
│   ├── css/
│   │   ├── main.css          # Main styles
│   │   ├── header.css        # Header styles
│   │   ├── footer.css        # Footer styles
│   │   └── tools.css         # Tool-specific styles
│   ├── js/
│   │   ├── main.js           # Main scripts
│   │   ├── include-components.js  # Component loader
│   │   ├── image-resizer.js  # Photo resize functionality
│   │   ├── signature.js      # Signature resize functionality
│   │   ├── pdf-compressor.js # PDF compression
│   │   ├── image-to-pdf.js   # Document conversion
│   │   ├── category-requirements-loader.js # Dynamic category loading
│   │   ├── exam-requirements-loader.js     # Exam requirements loader
│   │   └── exam-requirements.json          # Structured exam specifications
│   ├── images/
│   │   ├── logo.svg          # Site logo
│   │   ├── exam-logos/       # Exam category logos
│   │   │   ├── banking.svg
│   │   │   ├── jee-neet.svg
│   │   │   ├── railway.svg
│   │   │   ├── ssc.svg
│   │   │   ├── state.svg
│   │   │   └── upsc.svg
│   │   └── favicons/         # Favicon files
│   │       ├── apple-touch-icon.png
│   │       ├── favicon-16x16.png
│   │       ├── favicon-32x32.png
│   │       ├── favicon-64x64.png
│   │       ├── favicon-128x128.png
│   │       ├── favicon-256x256.png
│   │       ├── favicon.html
│   │       ├── favicon.ico
│   │       └── mstile-144x144.png
├── components/
│   ├── header.html           # Site header
│   ├── footer.html           # Site footer
│   ├── ads.html              # Ad placements
│   ├── share.html            # Social sharing
│   └── move-to-top.html      # Scroll to top button
├── tools/
│   ├── image-resizer.html    # Photo resize tool
│   ├── signature-resizer.html # Signature resize tool
│   ├── pdf-compressor.html   # PDF compression tool
│   └── image-to-pdf.html     # Document conversion tool
├── exams/
│   ├── banking.html          # Banking exam requirements
│   ├── jee-neet.html         # JEE & NEET exam requirements
│   ├── railway.html          # Railway exam requirements
│   ├── ssc.html              # SSC exam requirements
│   ├── upsc.html             # UPSC exam requirements
│   └── up-state-exams.html   # State exam requirements
└── pages/
    ├── contact.html          # Contact information
    ├── privacy-policy.html   # Privacy policy
    └── terms-of-service.html # Terms of service
```

## Local Development

### Prerequisites
- A modern web browser with JavaScript enabled
- Python 3.x (for local server)

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/yourusername/examformtools.git
cd examformtools
```

2. Start a local server:
```bash
python -m http.server 8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Processing**: Client-side JavaScript (Canvas API, File API)
- **Styling**: Custom CSS with Inter font from Google Fonts
- **SEO**: Structured data (JSON-LD), meta tags, sitemap
- **Analytics**: Google AdSense integration

## Security & Privacy

- **Client-Side Processing**: All file processing occurs in the browser
- **No Data Storage**: Files are never uploaded to servers
- **Auto-Clearance**: Processed files are automatically cleared after use
- **SSL Secured**: HTTPS encryption for secure connections
- **GDPR Compliant**: Respects user privacy and data protection

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions, suggestions, or support:
- Website: https://examformtools.in
- Email: examformtools.in@gmail.com

---

**Trusted by thousands of exam aspirants across India.** Start processing your documents today - completely free!
