import java.util.Random;

public class Die {
    public int getSides() {
		return sides;
	}

	public void setSides(final int sides) {
		this.sides = sides;
	}

	public void setValue(final int value) {
		this.value = value;
	}

	public Random getRand() {
		return rand;
	}

	public void setRand(final Random rand) {
		this.rand = rand;
	}

	private int sides;
    private int value;
    private Random rand;

    public Die() {
        this(6);
    }

    public Die(final int sides) {
        if (sides <= 0) {
            throw new IllegalArgumentException("Number of sides must be greater than 0");
        }
        this.sides = sides;
        rand = new Random();
    }

    public int roll() {
        value = rand.nextInt(sides) + 1;
        return value;
    }

    public int getValue() {
        return value;
    }
}
