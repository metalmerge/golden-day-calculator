public class Party implements Comparable<Party> {
	private static double blueTotal = 0;
	private static double redTotal = 0;
	private static double total = 0;

	private String name;
	private int votes;
	private String coalition;

	public Party(final String name, final int votes, final String coalition) {
		this.name = name;
		this.votes = votes;
		this.coalition = coalition;

		if (coalition.equalsIgnoreCase("Blue")) {
			blueTotal += votes;
		} else if (coalition.equalsIgnoreCase("Red")) {
			redTotal += votes;
		}
		total += votes;
	}

	public String getName() {
		return name;
	}

	public int getVotes() {
		return votes;
	}

	public String getCoalition() {
		return coalition;
	}

	public void setVotes(final int votes) {
		this.votes = votes;
	}

	public static double getBlueTotal() {
		return blueTotal;
	}

	public static double getRedTotal() {
		return redTotal;
	}

	public static double getTotal() {
		return total;
	}

	@Override
	public int compareTo(final Party otherParty) {
		return Integer.compare(votes, otherParty.votes);
	}

	@Override
	public String toString() {
		return name + ", " + votes + ", " + coalition;
	}

	public static void setBlueTotal(final double blueTotal) {
		Party.blueTotal = blueTotal;
	}

	public static void setRedTotal(final double redTotal) {
		Party.redTotal = redTotal;
	}

	public static void setTotal(final double total) {
		Party.total = total;
	}

	public void setName(final String name) {
		this.name = name;
	}

	public void setCoalition(final String coalition) {
		this.coalition = coalition;
	}

	public void resetVotes() {
		votes = 0;
		blueTotal = 0;
		redTotal = 0;
		total = 0;
	}

}
