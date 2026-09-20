import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ChatbotService {
  constructor(private prisma: PrismaService) {}

  async processQuery(query: string) {
    const q = query.toLowerCase();

    // 1. Fee / Admission queries
    if (q.includes('fee') || q.includes('cost') || q.includes('admission') || q.includes('enroll')) {
      return "Our fees vary depending on the class (Nursery to Class 10) and whether you enroll in School Education or Coaching. We have special Medhavi scholarships as well! Please contact our admission office at +91 62017 04992 for exact details.";
    }

    // 2. Class / Course queries
    if (q.includes('class') || q.includes('course') || q.includes('program') || q.includes('teach')) {
      const courses = await this.prisma.course.findMany({ select: { name: true, type: true } });
      if (courses.length > 0) {
        return `We offer both School Education and Coaching. Some of our programs include: ${courses.map(c => c.name).slice(0,5).join(', ')}. We focus on small batch sizes and individual attention!`;
      }
      return "We offer School Education (Nursery to Class 10 BSEB) and targeted Coaching Classes for all school subjects.";
    }

    // 3. Location / Contact
    if (q.includes('location') || q.includes('where') || q.includes('address') || q.includes('contact') || q.includes('phone') || q.includes('number')) {
      return "Shiksha Prabhat Public School & Coaching Classes is located in Bahurar, Bihar. You can reach us directly at +91 62017 04992 or email info@shikshaprabhat.com.";
    }

    // 4. Director
    if (q.includes('director') || q.includes('principal')) {
      return "Our Director is Sambhodh Kumar. He is dedicated to providing an empowering educational environment.";
    }

    // 5. Notices / News
    if (q.includes('notice') || q.includes('news') || q.includes('update')) {
      const notices = await this.prisma.notice.findMany({ orderBy: { createdAt: 'desc' }, take: 2 });
      if (notices.length > 0) {
        return `Here are our latest updates:\n` + notices.map(n => `- ${n.title}`).join('\n');
      }
      return "There are no new notices at the moment. Please check our Notice Board on the homepage!";
    }

    // 6. Toppers / Results
    if (q.includes('topper') || q.includes('rank') || q.includes('result') || q.includes('medhavi')) {
      const toppers = await this.prisma.topper.findMany({ orderBy: { createdAt: 'desc' }, take: 3 });
      if (toppers.length > 0) {
        return `We are so proud of our Medhavi Toppers! Some of our brightest stars are:\n` + toppers.map(t => `- ${t.name} (${t.score} in ${t.class})`).join('\n');
      }
      return "Our students consistently achieve top ranks in school and board examinations!";
    }

    // 7. Teachers / Faculty
    if (q.includes('teacher') || q.includes('faculty') || q.includes('sir')) {
      const teachers = await this.prisma.teacher.findMany({ select: { name: true, subject: true }, take: 5 });
      if (teachers.length > 0) {
        return `We have experienced and dedicated faculty. Some of our teachers are: ${teachers.map(t => `${t.name} (${t.subject})`).join(', ')}.`;
      }
      return "We have a team of highly experienced and dedicated teachers for all subjects.";
    }

    // 8. Greetings
    if (q.includes('hi ') || q.startsWith('hi') || q.includes('hello')) {
      return "Hello! Welcome to Shiksha Prabhat. How can I assist you with your child's education today?";
    }

    // Default Fallback
    return "Thank you for reaching out! For specific inquiries, please contact our director at +91 62017 04992 or visit our school in Bahurar, Bihar.";
  }
}
