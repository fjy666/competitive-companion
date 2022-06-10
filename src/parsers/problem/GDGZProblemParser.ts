import { Sendable } from '../../models/Sendable';
import { TaskBuilder } from '../../models/TaskBuilder';
import { htmlToElement } from '../../utils/dom';
import { Parser } from '../Parser';

export class GDGZProblemParser extends Parser {
  public getMatchPatterns(): string[] {
    return ['http://gdgzoi.com/problem.php*'];
  }

  public async parse(url: string, html: string): Promise<Sendable> {
    console.log("Start set succesfully! \n")
    const elem = htmlToElement(html);
    const task = new TaskBuilder('GDGZParser').setUrl(url);
    var s = elem.getElementsByClassName("container-fluid")[0].textContent
    var ss = s.substring(s.search("Time Limit"), s.search("Time Limit") + 99).substring(12,12 + 10).trim()
    var Tim = ss.substring(0, ss.search(" Sec"))
    task.setTimeLimit(Number(Tim))
    //时限
    console.log("Time limit set succesfuly! \n")
    ss = s.substring(s.search("Memory Limit"), s.search("Memory Limit") + 99).substr(14,10).trim()
    var Mem = ss.substring(0, ss.search(" MB"))
    task.setMemoryLimit(Number(Mem))
    console.log("Memory limit set succesfuly! \n")
    //内存限制
    var Nam = elem.getElementsByClassName("container-fluid")[0].getElementsByTagName("title")[0].textContent.trim()
    //标题
    task.setName(Nam.trim())
    console.log("Name set succesfuly! \n")
    var input = elem.getElementsByTagName("pre")[0].textContent
    var output = elem.getElementsByTagName("pre")[1].textContent
    task.addTest(input, output)
    console.log("Sample set succesfuly! \n")

    return task.build();
  }
}