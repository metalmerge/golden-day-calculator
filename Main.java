
/**

 * Golden Day Calculator
 * 
 What are some possible improvements/innovations for this golden day calculator that calculators if the day was a good one based off categories of my life that I want to work on. 
 
 * This program calculates the number of votes each party should receive based on user input. The program prompts the user to vote for or against each party and calculates the total number of votes for and against each party. It then determines the percentage of votes for each party and provides a classification based on the overall percentage.
 * 
 * The program uses the Party class to represent each party and their respective votes. The parties are divided into three coalitions: Blue, Green, and Red. The user is asked to input votes for each party, and the program calculates the total votes for each coalition.
 * 
 * The classification of the day is determined based on the overall percentage of votes. If the percentage is 100%, it is considered a "Perfect Game". If the percentage is between 75% and 99%, it is classified as a "Rhodium Day". If the percentage is between 67% and 74%, it is classified as a "Titanium Day". If the percentage is between 60% and 66%, it is classified as a "Diamond Day". If the percentage is between 51% and 59%, it is classified as a "Golden Day". If the percentage is below 51%, it is classified as "Limbo".
 * 
 * Author: Dimitry Ermakov
 * Date: 06/09/2023
 */
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {
	public static void main(final String[] args) {
		LocalDate currentDate = LocalDate.now(ZoneId.of("America/New_York"));
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");
		String formattedDate = currentDate.format(formatter);

		final Scanner sc = new Scanner(System.in);
		final String ANSI_RESET = "\u001B[0m";
		final String ANSI_RED = "\u001B[31m";
		final String ANSI_BLUE = "\u001B[34m";
		final String ANSI_GREEN = "\u001B[32m";
		final ArrayList<Party> array = new ArrayList<>();
		final ArrayList<Party> For = new ArrayList<>();
		final ArrayList<Party> Against = new ArrayList<>();
		boolean reset = false; // Flag to indicate if reset is requested

		while (!reset) {
			// System.out.print("\033[H\033[2J");
			// System.out.flush();

			array.clear();
			Against.clear();
			For.clear();

			array.add(new Party("Religion", 53, "Blue"));
			array.add(new Party("Motivation", 37, "Blue"));
			array.add(new Party("Maintenance", 37, "Blue"));
			array.add(new Party("Mental", 42, "Red"));
			// array.add(new Party("President", 21, "Green"));

			array.add(new Party("Education", 32, "Blue"));
			array.add(new Party("Sports", 47, "Blue"));
			array.add(new Party("Exercise", 41, "Blue"));
			array.add(new Party("Watch", 20, "Red"));

			array.add(new Party("Work", 50, "Green"));
			array.add(new Party("Pomodomo", 30, "Blue"));

			array.add(new Party("Invest", 0, "Green"));
			// array.add(new Party("Worked Ahead", 0, "Green"));
			array.add(new Party("Streak", 0, "Green"));

			array.add(new Party("Sleep", 50, "Red"));

			array.add(new Party("Music", 20, "Red"));

			// array.add(new Party("Charisma", 34, "Red"));
			array.add(new Party("Social", 17, "Red"));
			array.add(new Party("Fun", 6, "Red"));

			array.add(new Party("Programming", 48, "Blue"));
			// array.add(new Party("Engineering", 14, "Blue"));
			array.add(new Party("Knowledge", 20, "Blue"));

			// array.add(new Party("Chaos", 10, "Red"));

			double sum = 0;

			System.out.println("ENTER = yes, Any = no");
			double blue = 0;
			double red = 0;

			for (int i = 0; i < array.size(); i++) {
				final int vote = array.get(i).getVotes();
				if (array.get(i).getCoalition().equals("Blue")) {
					System.out.print(ANSI_BLUE + array.get(i).getVotes() + " = " + array.get(i).getName() + ":" + ANSI_RESET);
				} else if (array.get(i).getCoalition().equals("Green")) {
					System.out.print(ANSI_GREEN + array.get(i).getVotes() + " = " + array.get(i).getName() + ":" + ANSI_RESET);
				} else {
					System.out.print(ANSI_RED + array.get(i).getVotes() + " = " + array.get(i).getName() + ":" + ANSI_RESET);
				}
				final String str = sc.nextLine();
				if (str.equals("")) {
					For.add(array.get(i));
					sum += vote;
					if (array.get(i).getCoalition().equals("Blue")) {
						blue += vote;
					} else if (array.get(i).getCoalition().equals("Red")) {
						red += vote;
					}
				} else if (str.equalsIgnoreCase("q")) { // Check if reset is requested
					reset = true;
					array.get(0).resetVotes();
					break;
				} else if (isNumeric(str)) {
					array.get(i).setVotes(Integer.parseInt(str));
					For.add(array.get(i));

					sum += Integer.parseInt(str);
					if (array.get(i).getCoalition().equals("Blue"))
						blue += Integer.parseInt(str);
					else if (array.get(i).getCoalition().equals("Red"))
						red += Integer.parseInt(str);
				} else {
					Against.add(array.get(i));
				}
			}

			if (reset) {
				continue; // Skip the rest of the loop and start from the beginning
			}

			System.out.print("\033[H\033[2J");
			System.out.flush();

			final double percent = Math.round((sum / Party.getTotal()) * 100);
			System.out.println(
					ANSI_BLUE + "\nBlue Vote " + (int) Math.round((blue / Party.getBlueTotal()) * 100) + "% " + (int) blue + "/"
							+ (int) Party.getBlueTotal() + ANSI_RESET);
			System.out
					.println(ANSI_RED + "Red Vote " + (int) Math.round((red / Party.getRedTotal()) * 100) + "% " + (int) red + "/"
							+ (int) Party.getRedTotal() + ANSI_RESET);
			System.out.println("\nTotal: " + (int) percent + "% " + (int) sum + "/" + (int) Party.getTotal() + "\n");

			if (percent == 100) {
				System.out.print("Perfect Game = \"Free\"");

			} else if (percent >= 75) {
				System.out.print("Rhodium Day = \"Take a day off\"");
			} else if (percent >= 67) {
				System.out.print(formattedDate + " Titanium Day = \"One more episode\" = " + (int) percent + "%");
			} else if (percent >= 60) {
				System.out.print(formattedDate + " Diamond Day = \"One more mint\" = " + (int) percent + "%");
			} else if (percent >= 51) {
				System.out.println(formattedDate + " Golden Day = \"One Hour Break\" = " + (int) percent + "%");
			} else {
				System.out.print("Limbo\n");
			}
			sort(For);
			sort(Against);
			System.out.println("\n\nFor: " + (int) sum + " #" + For.size());
			for (final Party var : For) {
				switch (var.getCoalition()) {
					case "Blue":
						System.out.println(ANSI_BLUE + var.getName() + ": " +
								(Math.round((var.getVotes() / Party.getTotal()) * 100)) + "%" + " (" + var.getVotes() + ")"
								+ ANSI_RESET);
						break;
					case "Green":
						System.out.println(ANSI_GREEN + var.getName() + ": " +
								(Math.round((var.getVotes() / Party.getTotal()) * 100)) + "%" + " (" + var.getVotes() + ")"
								+ ANSI_RESET);
						break;
					case "Red":
						System.out.println(ANSI_RED + var.getName() + ": " +
								(Math.round((var.getVotes() / Party.getTotal()) * 100)) + "%" + " (" + var.getVotes() + ")"
								+ ANSI_RESET);
						break;
					default:
						break;
				}
			}
			System.out.println("\nAgainst: " + (int) (Party.getTotal() - sum) + " #" + Against.size());
			for (final Party var : Against) {
				final String coalition = var.getCoalition();
				final String name = var.getName();
				final int votes = var.getVotes();
				final int percentage = (int) (Math.round((votes / Party.getTotal()) * 100));

				switch (coalition) {
					case "Blue":
						System.out.println(ANSI_BLUE + name + ": " + percentage + "%" + " (" + votes + ")" + ANSI_RESET);
						break;
					case "Green":
						System.out.println(ANSI_GREEN + name + ": " + percentage + "%" + " (" + votes + ")" + ANSI_RESET);
						break;
					case "Red":
						System.out.println(ANSI_RED + name + ": " + percentage + "%" + " (" + votes + ")" + ANSI_RESET);
						break;
					default:
						System.out.println(name + ": " + percentage + "%" + " (" + votes + ")");
				}
			}
			array.get(0).resetVotes();
		}

		sc.close();
	}

	public static void sort(final ArrayList<Party> list) {
		list.sort((o1, o2) -> o1.compareTo(o2));
	}

	public static boolean isNumeric(final String str) {
		try {
			Double.parseDouble(str);
			return true;
		} catch (final NumberFormatException e) {
			return false;
		}
	}
}
