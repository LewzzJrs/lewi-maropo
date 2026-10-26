'use client';

export default function PrintButton() {
  return (
    <button type='button' className='cv-print' onClick={() => window.print()}>
      Save as PDF
    </button>
  );
}
