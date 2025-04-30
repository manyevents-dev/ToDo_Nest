import { Task } from "src/tasks.entity";
import { TaskStatus } from "src/tasks/createtask.dto";

export class TaskServiceMock {
    updateTitle(id: number, title: string) {
      if (title.length < 3) {
        throw new Error(`Titre de l'id : ${id} trop court`);
      }
    }
    // updateStatus(id: number, newStatus: TaskStatus){
    //         if (newStatus == 'done') {
    //             throw new Error(`Le status de la tache ${id} n'est pas modifiable`);
    //         }
    //         return {
    //             id,
    //             title: `Test Task ${id}`,
    //             status: newStatus,
    //             created_at: new Date(),
    //             updated_at: new Date()
    //           };
    //     }
  }